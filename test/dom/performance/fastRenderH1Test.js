'use strict';

const createTestRunner = require('../../help/browsertimeRunner')
    .createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Fast render advice HTTP/1:', function() {
  BROWSERS.forEach(function(browser) {
    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'performance');

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('We should know that synchronous JavaScript and CSS request(s) make the page render slower', function() {
        return runner
          .run('fastRender.js', 'fastrender/avoidJSSyncInHead.html')
          .then(result => {
            // CSS and JS sync hurt in the H1 world
            assert.strictEqual(result.offending.length, 2);
          });
      });

      it('We should know that loading JavaScript asynchronously is OK', function() {
        return runner
          .run('fastRender.js', 'fastrender/jsAsyncIsOk.html')
          .then(result => {
            assert.strictEqual(result.offending.length, 0);
          });
      });
    });
  });
});
