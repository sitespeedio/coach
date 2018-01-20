'use strict';

const fs = require('fs'),
  pagexray = require('pagexray'),
  browsertime = require('browsertime'),
  path = require('path'),
  Promise = require('bluebird'),
  merger = require('./merge').merge,
  merge = require('lodash.merge'),
  pickAPage = require('./har/harCutter').pickAPage,
  harRunner = require('./har');

Promise.promisifyAll(fs);

const DEFAULT_OPTIONS = {
  browser: 'firefox',
  iterations: 1
};

// We set this in the Dockerfile
if (process.env.DOCKER) {
  DEFAULT_OPTIONS.xvfb = true;
  DEFAULT_OPTIONS.docker = true;
}

function getPagesFromHar(harJson) {
  return Promise.resolve(harJson).then(harJson =>
    pagexray.convert(harJson, {
      includeAssets: true
    })
  );
}

function runBrowsertime(url, script, options) {
  function browsertimeify(script) {
    return Promise.resolve(script).then(script => {
      return {
        coach: {
          domAdvice: script
        }
      };
    });
  }

  browsertime.logging.configure(options);

  const engine = new browsertime.Engine(options);

  return engine
    .start()
    .then(() => engine.run(url, browsertimeify(script)))
    .finally(() => engine.stop());
}

module.exports = {
  getDomAdvice() {
    return fs.readFileAsync(
      path.resolve(__dirname, '..', 'dist', 'coach.min.js'),
      'utf8'
    );
  },
  runDomAdvice(url, script, options) {
    if (!script) {
      script = this.getDomAdvice();
    }

    options = merge({}, DEFAULT_OPTIONS, options);
    options.skipHar = true;

    return runBrowsertime(url, script, options).then(result => {
      if (options.screenshot) {
        result.browserScripts[0].coach.domAdvice.screenshot =
          result.screenshots[0];
      }
      return result.browserScripts[0].coach.domAdvice;
    });
  },
  getHarAdvice() {
    let rootPath = path.resolve(__dirname, 'har', 'performance');

    return fs
      .readdirAsync(rootPath)
      .map(fileName => path.resolve(rootPath, fileName))
      .filter(file => fs.statAsync(file).then(stats => stats.isFile()))
      .map(file => require(file));
  },
  runHarAdvice(har, script, domAdvice, options) {
    if (!script) {
      script = this.getHarAdvice();
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
  run(url, domScript, harScript, options) {
    if (!domScript) {
      domScript = this.getDomAdvice();
    }

    options = merge({}, DEFAULT_OPTIONS, options);
    return runBrowsertime(url, domScript, options).then(result => {
      const domAdvice = result.browserScripts[0].coach.domAdvice,
        har = result.har;

      if (options.screenshot) {
        domAdvice.screenshot = result.screenshots[0];
      }

      return this.runHarAdvice(har, harScript, domAdvice, options).then(
        harAdvice => this.merge(domAdvice, harAdvice)
      );
    });
  }
};
