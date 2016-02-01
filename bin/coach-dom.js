#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
  stringify = require('json-stable-stringify'),
  domApi = require('../').dom;

Promise.promisifyAll(fs);

let options = yargs
  .usage('$0 [options] <url>')
  .require(1, 'url')
  .option('browser', {
    describe: 'Browser to run.',
    default: 'firefox',
    alias: 'b'
  })
  .wrap(yargs.terminalWidth())
  .argv;

let url = options._[0];
let browser = options.browser;

domApi.runAdvice(url, domApi.getAdviceScript(), {browser})
  .then((result) => {
    console.log(stringify(result, {space: 2}));
    process.exit(0);
  })
  .catch((e) => {
    console.error('Error running advice: ', e);
    process.exit(1);
  });
