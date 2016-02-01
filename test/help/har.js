#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path'),
  harApi = require('../..').har;

Promise.promisifyAll(fs);

module.exports = {
  getHARresult: function(harFile) {
    return fs.readFileAsync(path.resolve(harFile))
      .then(JSON.parse)
      .then(harApi.getPagesFromHar)
      .then((pages) => harApi.runAdvice(pages, harApi.getAllAdvice()))
      .then((results) => {
        return results;
      });
  }
};
