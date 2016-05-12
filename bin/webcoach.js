#!/usr/bin/env node

'use strict';

let Promise = require('bluebird'),
  fs = require('fs'),
  path = require('path'),
  stringify = require('json-stable-stringify'),
  ResultTable = require('../lib/table'),
  cli = require('../lib/cli'),
  api = require('../lib');

Promise.promisifyAll(fs);

function run(options) {
  function setupOptions(options) {
    options.iterations = 1;
    if (options.mobile) {
      options.viewPort = '360x640';
      if (options.browser === 'chrome') {
        options.chrome = {
          mobileEmulation: {
            deviceName: 'Apple iPhone 6'
          }
        };
      } else {
        options.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25';
      }
    }
    return options;
  }

  function runAdvice(options) {
    var urlOrHar = options._[0];
    if (urlOrHar.match(/^http(s)?:\/\//)) {
      return api.run(urlOrHar, null, null, options);
    } else {
      return fs.readFileAsync(path.resolve(urlOrHar), 'utf8')
        .then(JSON.parse)
        .then((json) => api.runHarAdvice(json, null, null, options))
        .then((results) => results[0]);
    }
  }

  function formatOutput(result, options) {
    if (options.format === 'json') {
      result.screenshot = undefined;
      return stringify(result, {
        space: 2
      });
    } else {
      let table = new ResultTable(result, options);
      return table.generate();
    }
  }

  function printOutput(output, options) {
    if (options.output) {
      return fs.writeFileAsync(path.resolve(options.output), output, 'utf8');
    } else {
      console.log(output);
    }
  }

  function storeScreenshot(result, options) {
    if (options.screenshot) {
      return fs.writeFileAsync(path.join(process.cwd(),'screenshot.png'),result.screenshot);
    }
  }

  return Promise.resolve(setupOptions(options))
    .then((options) => runAdvice(options)
    .tap((result) => storeScreenshot(result, options))
    .then((result) => formatOutput(result, options)))
    .then((output) => printOutput(output, options))
    .catch((e) => {
      console.error('Error running advice: ', e.stack);
      process.exitCode = 1;
    })
    .finally(() => process.exit);
}

run(cli.getOptions());
