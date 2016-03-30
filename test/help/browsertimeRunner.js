'use strict';

let Promise = require('bluebird'),
  browsertime = require('browsertime'),
  fs = require('fs'),
  path = require('path');

Promise.promisifyAll(fs);

browsertime.logging.configure({});

module.exports = {
  createTestRunner(browser, category, useHttp2) {
    const runner = new browsertime.SeleniumRunner({
      browser: browser,
      timeouts: {
        browserStart: 60000
      }
    });

    const protocol = useHttp2 ? 'https://' : 'http://',
      port = useHttp2 ? '8383' : '8282';

    function run(url, script) {
      return Promise.resolve(script)
        .then((script) =>
          runner
            .loadAndWait(url, 'return window.performance.timing.loadEventEnd>0')
            .then(() => runner.runScript(script)));
    }

    return {
      start() {
        return runner.start();
      },
      stop() {
        return runner.stop();
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

        const url = protocol + '0.0.0.0:' + port + '/' + category + '/' + testPage,
          script = Promise.join(utilScript, ruleScript,
            (utilScript, ruleScript) => (utilScript + ' return ' + ruleScript));

        return run(url, script);
      }
    }
  }
};
