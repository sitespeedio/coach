'use strict';

const fs = require('fs'),
  snufkin = require('snufkin'),
  browsertime = require('browsertime'),
  path = require('path'),
  Promise = require('bluebird'),
  merger = require('./lib/merge').merge,
  harRunner = require('./lib/har');

Promise.promisifyAll(fs);

module.exports = {
  dom: {
    getAdviceScript() {
      return fs.readFileAsync(path.resolve(__dirname, 'dist', 'coach.min.js'), 'utf8');
    },
    runAdvice(url, options) {
      browsertime.logging.configure(options);
      options.scripts = browsertime.browserScripts.parseBrowserScripts('dist/coach.js', false);

      let runner = new browsertime.Engine(options);

      return runner.start()
        .then(() => runner.run(url))
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
