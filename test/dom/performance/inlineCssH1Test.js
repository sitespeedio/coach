'use strict';

const createTestRunner = require('../../help/browsertimeRunner').createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Inline CSS advice HTTP/1:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'performance');

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('We should be able to know if we inline CSS and request CSS files', function() {
        return runner.run('inlineCss.js', 'inlinecss/inlineAndRequestCss.html')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to know if we request CSS files', function() {
        return runner.run('inlineCss.js', 'inlinecss/noInlineAndRequestCss.html')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

    });
  });

});
