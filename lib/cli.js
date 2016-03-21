'use strict';

let fs = require('fs'),
  path = require('path'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
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
  },

  getOptions: function() {
    return yargs
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
      .option('o', {
        describe: 'Output format.',
        choices: ['table', 'json'],
        default: 'table',
        alias: 'output'
      })
      .option('offending', {
        describe: 'Show offending request/responses in table output',
        default: false
      })
      .option('description', {
        describe: 'Show advice description in table output',
        default: false
      })
      .option('l', {
        describe: 'Show advice with score lower than the limit',
        default: 100,
        alias: 'limit'
      })
      .wrap(yargs.terminalWidth())
      .check((argv) => {
        if (!(argv.u || argv.f)) {
          return '-u or -f must be specified.';
        }
        return true;
      })
      .strict()
      .argv;
  }
};

module.exports = cli;
