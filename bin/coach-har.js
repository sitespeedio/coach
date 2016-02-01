#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path'),
  stringify = require('json-stable-stringify'),
  harApi = require('../').har;

Promise.promisifyAll(fs);

if (process.argv.length !== 3) {
  console.error('Must pass har file as argument');
  process.exit(1);
}

fs.readFileAsync(path.resolve(process.cwd(), process.argv[2]))
  .then(JSON.parse)
  .then(harApi.getPagesFromHar)
  .then((pages) => harApi.runAdvice(pages, harApi.getAllAdvice(), {}))
  .then((results) => {
    console.log(stringify(results, {space: 3}));
    process.exit(0);
  })
  .catch((e) => {
    console.error('Error running advice for har', e);
    process.exit(1);
  });
