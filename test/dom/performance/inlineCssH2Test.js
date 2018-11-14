'use strict';

const createTestRunner = require('../../help/browsertimeRunner')
    .createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Inline CSS advice HTTP/2:', function() {
  BROWSERS.forEach(function(browser) {
    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'performance', true);

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('We should be able to know if we inline CSS and request CSS files', function() {
        return runner
          .runGlobalServer(
            'inlineCss.js',
            'https://www.sitespeed.io/testcases/performance/inlinecss/inlineAndRequestCss.html'
          )
          .then(result => {
            assert.strictEqual(result.score, 95);
          });
      });

      it('We should be able to know if we request CSS file(s)', function() {
        // TODO make this work in FF
        /*
        if (browser === 'firefox') {
          this.skip();
        }
        */
        return runner
          .runGlobalServer(
            'inlineCss.js',
            'https://www.sitespeed.io/testcases/performance/inlinecss/noInlineAndRequestCss.html'
          )
          .then(result => {
            assert.strictEqual(result.score, 100);
          });
      });
    });
  });
});
