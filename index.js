'use strict';

const fs = require('fs'),
  snufkin = require('snufkin'),
  browsertime = require('browsertime'),
  path = require('path'),
  Promise = require('bluebird'),
  merger = require('./lib/merge').merge,
  harRunner = require('./lib/har');

Promise.promisifyAll(fs);

function getAdviceScript() {
  return fs.readFileAsync(path.resolve(__dirname, 'dist', 'coach.min.js'), 'utf8');
}

function getCoachScripts() {
  return Promise.resolve(getAdviceScript())
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
  dom: {
    getAdviceScript() {
      return getAdviceScript();
    },
    runAdvice(url, options) {

      let coachScripts = getCoachScripts();

      browsertime.logging.configure(options);

      let runner = new browsertime.Engine(options);

      return runner.start()
        .then(() => runner.run(url, coachScripts))
        .finally(() => runner.stop());
    }
  },
  har: {
    getAllAdvice() {
      let rootPath = path.resolve(__dirname, 'lib', 'har', 'performance');

      return fs.readdirAsync(rootPath)
        .map((fileName) => path.resolve(rootPath, fileName))
        .filter((file) => fs.statAsync(file).then((stats) => stats.isFile()))
        .map((file) => require(file));
    },
    getPagesFromHar(harJson) {
      return snufkin.convert(harJson, {
        includeAssets: true
      });
    },
    runAdvice(pages, adviceList, options) {
      return Promise.resolve([pages, adviceList])
        .spread((pages, adviceList) =>
          harRunner.runAdvice(pages, adviceList, options));
    }
  },
  merge(domAdvice, harAdvice) {
    return merger(domAdvice, harAdvice);
  }
};
