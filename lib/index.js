'use strict';

const fs = require('fs');
const pagexray = require('pagexray');
const browsertime = require('browsertime');
const path = require('path');
const merger = require('./merge').merge;
const merge = require('lodash.merge');
const pickAPage = require('./har/harCutter').pickAPage;
const harRunner = require('./har');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const DEFAULT_OPTIONS = {
  browser: 'firefox',
  iterations: 1,
  headless: true
};

// We set this in the Dockerfile
if (process.env.DOCKER) {
  DEFAULT_OPTIONS.docker = true;
}

function getPagesFromHar(harJson) {
  return pagexray.convert(harJson, {
    includeAssets: true
  });
}

async function runBrowsertime(url, script, options) {
  function browsertimeify(script) {
    return {
      coach: {
        domAdvice: script
      }
    };
  }

  browsertime.logging.configure(options);
  options.resultDir = process.cwd();

  const engine = new browsertime.Engine(options);
  const scripts = await browsertimeify(script);
  await engine.start();
  try {
    return engine.run(url, scripts);
  } finally {
    engine.stop();
  }
}

module.exports = {
  async getDomAdvice() {
    return readFile(
      path.resolve(__dirname, '..', 'dist', 'coach.min.js'),
      'utf8'
    );
  },
  async runDomAdvice(url, script, options) {
    if (!script) {
      script = await this.getDomAdvice();
    }

    options = merge({}, DEFAULT_OPTIONS, options);
    options.skipHar = true;

    const result = await runBrowsertime(url, script, options);
    return result.browserScripts[0].coach.domAdvice;
  },
  async getHarAdvice() {
    let rootPath = path.resolve(__dirname, 'har', 'performance');

    const files = await readdir(rootPath);
    let harAdvice = [];
    for (let fileName of files) {
      harAdvice.push(path.resolve(rootPath, fileName));
    }
    harAdvice = harAdvice.filter(file =>
      stat(file).then(stats => stats.isFile())
    );
    return harAdvice.map(file => require(file));
  },
  async runHarAdvice(har, script, domAdvice, options) {
    if (!script) {
      script = await this.getHarAdvice();
    }

    options = merge({}, DEFAULT_OPTIONS, options);
    options.skipHar = false;

    return harRunner.runAdvice(
      getPagesFromHar(har),
      script,
      domAdvice,
      options
    );
  },
  merge(domAdvice, harAdvice) {
    return merger(domAdvice, harAdvice);
  },
  pickAPage(har, pageIndex) {
    return pickAPage(har, pageIndex);
  },
  async run(url, domScript, harScript, options) {
    if (!domScript) {
      domScript = await this.getDomAdvice();
    }

    options = merge({}, DEFAULT_OPTIONS, options);
    const result = await runBrowsertime(url, domScript, options);
    if (
      Array.isArray(result.errors) &&
      result.errors.length !== 0 &&
      result.errors[0].length !== 0
    ) {
      const browsertimeError = new Error(result.errors);
      browsertimeError.name = 'BrowsertimeError';
      throw browsertimeError;
    }
    const domAdvice = result.browserScripts[0].coach.domAdvice;

    if (result.har) {
      const harAdvice = this.runHarAdvice(
        result.har,
        harScript,
        domAdvice,
        options
      );
      return this.merge(domAdvice, harAdvice);
    } else {
      return domAdvice;
    }
  }
};
