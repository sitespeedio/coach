'use strict';

let fs = require('fs'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
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
      .option('f', {
        describe: 'Output format.',
        choices: ['table', 'json'],
        default: 'table',
        alias: 'format'
      })
      .option('o', {
        describe: 'File to write output to.',
        alias: 'output'
      })
      .option('offending', {
        describe: 'Show offending request/responses in table output',
        default: false,
        type: 'boolean'
      })
      .option('description', {
        describe: 'Show advice description in table output',
        default: false,
        type: 'boolean'
      })
      .option('l', {
        describe: 'Show advice with score lower than the limit',
        default: 100,
        alias: 'limit'
      })
      .option('mobile', {
        describe: 'Access the page as mobile a mobile device. Set UA and width/height. For Chrome it will use device Apple iPhone 6.',
        default: false,
        type: 'boolean'
      })
      .option('screenshot', {
        describe: 'Take a screenshot of the tested page. If the output format is JSON, it will be attached to the JSON, else it will be stored on disk as screenshot.png',
        default: false,
        type: 'boolean'
      })
      .wrap(yargs.terminalWidth())
      // .strict()
      .argv;
  }
};

module.exports = cli;
