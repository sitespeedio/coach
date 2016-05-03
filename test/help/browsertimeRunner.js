'use strict';

let Promise = require('bluebird'),
  browsertime = require('browsertime'),
  urlParser = require('url'),
  fs = require('fs'),
  webserver = require('./webserver'),
  path = require('path');

Promise.promisifyAll(fs);

browsertime.logging.configure({});

module.exports = {
  createTestRunner(browser, category, useHttp2) {
    function run(url, script) {
      return Promise.resolve(script)
        .then((script) =>
          runner
            .loadAndWait(url, 'return window.performance.timing.loadEventEnd>0')
            .then(() => runner.runScript(script)));
    }

    const runner = new browsertime.SeleniumRunner({
      browser: browser,
      timeouts: {
        browserStart: 60000
      }
    });

    let baseUrl;
    
    return {
      start() {
        return webserver.startServer(useHttp2)
          .then((address) => {
            baseUrl = urlParser.format({
              protocol: useHttp2 ? 'https' : 'http',
              hostname: address.address,
              port: address.port
            })
          })
          .then(() => runner.start());
      },
      stop() {
        return runner.stop()
          .finally(() => webserver.stopServer());
      },
      run(ruleFileName, testPage) {
        if (!testPage) {
          testPage = path.basename(ruleFileName, '.js') + '.html';
        }

        const domPath = path.resolve(__dirname, '..', '..', 'lib', 'dom'),
          utilPath = path.resolve(domPath, 'util.js'),
          utilScript = fs.readFileAsync(utilPath, 'utf8'),
          rulePath = path.resolve(domPath, category, ruleFileName),
          ruleScript = fs.readFileAsync(rulePath, 'utf8');

        const url = urlParser.resolve(baseUrl, category + '/' + testPage),
          script = Promise.join(utilScript, ruleScript,
            (utilScript, ruleScript) => (utilScript + ' return ' + ruleScript));

        return run(url, script);
      }
    }
  }
};
