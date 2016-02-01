#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  path = require('path'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
  stringify = require('json-stable-stringify'),
  domApi = require('../').dom,
  harApi = require('../').har,
  packageInfo = require('../package');

Promise.promisifyAll(fs);

function runDOM(options) {
  domApi.runAdvice(options.url, domApi.getAdviceScript(), {browser: options.browser})
    .then((result) => {
      console.log(stringify(result, {space: 2}));
      process.exit(0);
    })
    .catch((e) => {
      console.error('Error running advice: ', e);
      process.exit(1);
    });
}

function runHAR(options) {
  fs.readFileAsync(path.resolve(process.cwd(), options.file))
    .then(JSON.parse)
    .then(harApi.getPagesFromHar)
    .then((pages) => harApi.runAdvice(pages, harApi.getAllAdvice(), {}))
    .then((results) => {
      console.log(stringify(results, {space: 2}));
      process.exit(0);
    })
    .catch((e) => {
      console.error('Error running advice for har', e);
      process.exit(1);
    });
}

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
  runDOM(options);
} else if (options.file) {
  runHAR(options);
}
