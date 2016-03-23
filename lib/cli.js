'use strict';

let fs = require('fs'),
  path = require('path'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
  api = require('../'),
  packageInfo = require('../package');


Promise.promisifyAll(fs);
var cli = {
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
      .option('mobile', {
        describe: 'Access the page as mobile a mobile device. Set UA and width/height. For Chrome it will use device Apple iPhone 6.',
        default: false
      })
      .wrap(yargs.terminalWidth())
      // .strict()
      .argv;
  }
};

module.exports = cli;
