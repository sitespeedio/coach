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
  const config = {
      browser: options.browser,
      experimental: {
        nativeHar: true
      },
      iterations: 1
    };

  if (options.device === 'mobile') {
      config.viewPort = '360x640';
      if (config.browser === 'chrome') {
        config.chrome = {};
        config.chrome.mobileEmulation = {};
        config.chrome.mobileEmulation.deviceName = 'Apple iPhone 6';
      } else {
        config.userAgent ='Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25';
      }
  }

  const browsertime = api.runDomAdvice(options._[0], api.getDomAdvice(), config );

    const har = browsertime.then((result) =>
      api.runHarAdvice(result.har, api.getHarAdvice(), result.browsertimeData[0].coach, options))
    ;

    return Promise.join(browsertime, har, function(browsertimeResult, harResult) {
      const total = api.merge(browsertimeResult.browsertimeData[0].coach, harResult);
      return total;
    });
  },

  runHAR: function(options) {
    return fs.readFileAsync(path.resolve(process.cwd(), options._[0]))
      .then(JSON.parse)
      .then((har) => api.runHarAdvice(har, api.getHarAdvice()));
  },

  getOptions: function() {
    return yargs
      .usage('$0 [options] <url>/<file.har>')
      .require(1, 'You must pass a URL or a har file to the coach')
      .version(() => `${packageInfo.name} ${packageInfo.version}`)
      .alias('V', 'version')
      .help('h')
      .alias('h', 'help')
      .option('b', {
        describe: 'Browser to run (only applicable when testing a URL).',
        default: 'firefox',
        alias: 'browser'
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
      .option('d', {
        describe: 'Acces the page as mobile or dekstop. Will set UA and width/height. For Chrome it will use device Apple iPhone 6 when you use mobile',
        choices: ['desktop', 'mobile'],
        default: 'desktop',
        alias: 'device'
      })
      .wrap(yargs.terminalWidth())
      // .strict()
      .argv;
  }
};

module.exports = cli;
