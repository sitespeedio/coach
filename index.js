'use strict';

const fs = require('fs'),
  snufkin = require('snufkin'),
  browsertime = require('browsertime'),
  path = require('path'),
  Promise = require('bluebird'),
  harRunner = require('./lib/har');

Promise.promisifyAll(fs);

module.exports = {
  dom: {
    getAdviceScript() {
      return fs.readFileAsync(path.resolve(__dirname, 'dist', 'coach.min.js'), 'utf8');
    },
    runAdvice(url, script, options) {
      browsertime.logging.configure(options);

      let runner = new browsertime.SeleniumRunner(options);

      return Promise.resolve(script)
        .then((script) =>
          runner.start()
            .then(() => runner.loadAndWait(url))
            .then(() => runner.runScript('return ' + script))
            .finally(() => runner.stop()));
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
  }
};
