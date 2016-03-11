'use strict';

const fs = require('fs'),
  snufkin = require('snufkin'),
  browsertime = require('browsertime'),
  path = require('path'),
  Promise = require('bluebird'),
  merger = require('./merge').merge,
  harRunner = require('./har');

Promise.promisifyAll(fs);

function getPagesFromHar(harJson) {
  return snufkin.convert(harJson, {
    includeAssets: true
  });
}

function browsertimeify(script) {
  return Promise.resolve(script)
    .then((script) => {
      return {
        coachAdvice: script
      };
    })
    .then((scriptObject) => {
      return {
        "coach": scriptObject
      }
    })
}


module.exports = {
  getDomAdvice() {
    return fs.readFileAsync(path.resolve(__dirname, '..', 'dist', 'coach.min.js'), 'utf8');
  },
  runDomAdvice(url, script, options) {
    let coachScript = script ? browsertimeify(script) : browsertimeify(this.getDomAdvice());
    options = options || {};
    browsertime.logging.configure(options);
    let runner = new browsertime.Engine(options);

    return runner.start()
      .then(() => runner.run(url, coachScript))
      .finally(() => runner.stop());
  },
  getHarAdvice() {
    let rootPath = path.resolve(__dirname, 'har', 'performance');

    return fs.readdirAsync(rootPath)
      .map((fileName) => path.resolve(rootPath, fileName))
      .filter((file) => fs.statAsync(file).then((stats) => stats.isFile()))
      .map((file) => require(file));
  },
  runHarAdvice(har, script, options) {
    let harScript = script ? script : this.getHarAdvice();
    return Promise.resolve([getPagesFromHar(har), harScript])
      .spread((pages, adviceList) =>
        harRunner.runAdvice(pages, adviceList, options));
  },
  merge(domAdvice, harAdvice) {
    return merger(domAdvice, harAdvice);
  }
};
