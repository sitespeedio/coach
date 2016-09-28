'use strict';

const createTestRunner = require('../../help/browsertimeRunner').createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Inline CSS advice HTTP/2:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'performance', true);

      before(() => runner.start(browser));

      after(() => runner.stop());


      it('We should be able to know if we inline CSS and request CSS files', function() {
        if (browser === 'firefox') {
          // Skip for now, since Firefox fails for local H2 sites (likely due to self signed cert)
          this.skip();
        }

        return runner.run('inlineCss.js', 'inlinecss/inlineAndRequestCss.html')
          .then((result) => {
            assert.strictEqual(result.score, 95);
          });
      });

      it('We should be able to know if we request CSS file(s)', function() {
        if (browser === 'firefox') {
          // Skip for now, since Firefox fails for local H2 sites (likely due to self signed cert)
          this.skip();
        }

        return runner.run('inlineCss.js', 'inlinecss/noInlineAndRequestCss.html')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });
    });
  });

});
