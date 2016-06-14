'use strict';

let fs = require('fs'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
  packageInfo = require('../package');

Promise.promisifyAll(fs);
var cli = {
  getOptions: () => {
    return yargs
      .usage('$0 [options] <url>/<file.har>')
      .require(1, 'You must pass a URL or a har file to the coach')
      .version(() => `${packageInfo.name} ${packageInfo.version}`)
      .alias('V', 'version')
      .help('h')
      .alias('h', 'help')
      .option('b', {
        describe: 'Browser to run (only applicable when testing a URL).',
        default: 'chrome',
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
      .option('details', {
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
        describe: 'Take a screenshot of the tested page saved as screenshot.png',
        default: false,
        type: 'boolean'
      })
      .option('noColor', {
        describe: 'Do not print color information.',
        default: false,
        type: 'boolean'
      })
      .option('preScript', {
        describe: 'Task(s) to run before you test your URL (use it for login etc). Note that --preScript can be passed multiple times.'
      })
      .wrap(yargs.terminalWidth())
      // .strict()
      .argv;
  }
};

module.exports = cli;
