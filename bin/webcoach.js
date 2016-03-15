#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  path = require('path'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
  stringify = require('json-stable-stringify'),
  api = require('../'),
  packageInfo = require('../package');

Promise.promisifyAll(fs);
var cli = {
  runDOMAndHar: function(options) {
    var browsertime = api.runDomAdvice(options.url, api.getDomAdvice(), {
      browser: options.browser,
      experimental: {
        nativeHar: true
      },
      iterations: 1
    });

    var har = browsertime.then((result) => api.runHarAdvice(result.har, api.getHarAdvice()));

    return Promise.join(browsertime, har, function(browsertimeResult, harResult) {
      let total = api.merge(browsertimeResult.browsertimeData[0].coach, harResult);
      return total;
    });
  },

  runHAR: function(options) {
    return fs.readFileAsync(path.resolve(process.cwd(), options.file))
      .then(JSON.parse)
      .then((har) => api.runHarAdvice(har, api.getHarAdvice()));
  }
};

let options = yargs
  .usage('$0 [options]')
  .version(() => `${packageInfo.name} ${packageInfo.version}`)
  .alias('V', 'version')
  .help('h')
  .alias('h', 'help')
  .option('b', {
    describe: 'Browser to run (only applicable with --url).',
    default: 'firefox',
    alias: 'browser'
  })
  .option('u', {
    describe: 'Url to run in browser and analyze DOM for advice.',
    alias: 'url'
  })
  .option('f', {
    describe: 'HAR file to parse and analyze for advice.',
    alias: 'file'
  })
  .wrap(yargs.terminalWidth())
  .check((argv) => {
    if (!(argv.u || argv.f)) {
      return '-u or -b must be specified.';
    }
    return true;
  })
  .strict()
  .argv;


if (options.url) {
  cli.runDOMAndHar(options).then((result) => {
    console.log(stringify(result, {
      space: 2
    }));
    process.exit(0);
  }).catch((e) => {
    console.error('Error running advice: ', e);
    process.exit(1);
  });
} else if (options.file) {
  cli.runHAR(options).then((results) => {
    console.log(stringify(results, {
      space: 2
    }));
    process.exit(0);
  }).catch((e) => {
    console.error('Error running advice for har', e);
    process.exit(1);
  });
}

module.exports = cli;
