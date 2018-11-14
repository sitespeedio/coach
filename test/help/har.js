'use strict';

let fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path'),
  api = require('../../lib/');

Promise.promisifyAll(fs);

module.exports = {
  harFromTestFile(fileName) {
    return fs
      .readFileAsync(path.resolve(__dirname, '..', 'har', 'files', fileName))
      .then(JSON.parse);
  },
  async firstAdviceForTestFile(fileName, options) {
    const advice = await api.getHarAdvice();
    return this.harFromTestFile(fileName)
      .then(har => api.runHarAdvice(har, advice, undefined, options))
      .then(result => result[0].advice);
  }
};
