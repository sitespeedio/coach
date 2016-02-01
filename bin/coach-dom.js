#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  Promise = require('bluebird'),
  stringify = require('json-stable-stringify'),
  domApi = require('../').dom;

Promise.promisifyAll(fs);

const argc = process.argv.length;
if (!(argc === 3 || argc === 4)) {
  console.error('Must pass url as argument');
  process.exit(1);
}

let url = process.argv[2];
let browser = process.argv[3] || 'firefox';

domApi.runAdvice(url, domApi.getAdviceScript(), {browser})
  .then((result) => {
    console.log(stringify(result, {space: 2}));
    process.exit(0);
  })
  .catch((e) => {
    console.error('Error running advice: ', e);
    process.exit(1);
  });