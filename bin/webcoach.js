#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const stringify = require('json-stable-stringify');
const ResultTable = require('../lib/table');
const cli = require('../lib/cli');
const api = require('../lib');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

async function run(options) {
  function setupOptions(options) {
    options.iterations = 1;
    if (options.mobile) {
      if (!options.viewPort) {
        options.viewPort = '360x640';
      }
      if (options.browser === 'chrome') {
        options.chrome = {
          mobileEmulation: {
            deviceName: 'iPhone 6'
          }
        };
      } else {
        options.userAgent =
          'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25';
      }
    }

    if (options.browser === 'chrome') {
      options.chrome = options.chrome || {};
      options.chrome.timeline = true;
    }
    return options;
  }

  async function runAdvice(options) {
    var urlOrHar = options._[0];
    if (urlOrHar.match(/^http(s)?:\/\//)) {
      return api.run(urlOrHar, null, null, options);
    } else {
      return readFile(path.resolve(urlOrHar), 'utf8')
        .then(JSON.parse)
        .then(json => api.runHarAdvice(json, null, null, options))
        .then(results => results[0]);
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

  options = setupOptions(options);
  try {
    const result = await runAdvice(options);
    const output = formatOutput(result, options);
    printOutput(output, options);
  } catch (e) {
    console.error('Error running advice: ', e.stack);
    process.exitCode = 1;
  } finally {
    if (options.browser === 'chrome') {
      await unlink(path.resolve(process.cwd(), 'trace-1.json.gz'));
    }
    process.exit;
  }
}

run(cli.getOptions());
