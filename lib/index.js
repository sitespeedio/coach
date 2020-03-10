'use strict';

const browsertime = require('browsertime');
const merge = require('lodash.merge');
const coach = require('coach-core');

const DEFAULT_OPTIONS = {
  browser: 'firefox',
  iterations: 1,
  headless: true
};

// We set this in the Dockerfile
if (process.env.DOCKER) {
  DEFAULT_OPTIONS.docker = true;
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
    return coach.getDomAdvice();
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
    return coach.getHarAdvice();
  },

  async runHarAdvice(har, script, domAdvice, options) {
    return coach.runHarAdvice(har, script, domAdvice, options);
  },
  merge(domAdvice, harAdvice) {
    return coach.merge(domAdvice, harAdvice);
  },
  pickAPage(har, pageIndex) {
    return coach.pickAPage(har, pageIndex);
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
    const domAdvice = result[0].browserScripts[0].coach.domAdvice;

    if (result.har) {
      const harAdvice = await this.runHarAdvice(
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
