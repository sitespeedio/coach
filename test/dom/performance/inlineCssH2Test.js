'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'https://0.0.0.0:8383/performance/inlinecss/';

let BROWSERS = ['chrome', 'firefox'];

describe('Inline CSS advice HTTP/2:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {
      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should be able to know if we inline CSS and request CSS files', function() {
        return bt.run(path + 'inlineAndRequestCss.html', 'lib/dom/performance/inlineCss.js')
          .then((result) => {
            assert.strictEqual(result.score, 95);
          });
      });

      it('We should be able to know if we request CSS file(s)', function() {
        return bt.run(path + 'noInlineAndRequestCss.html', 'lib/dom/performance/inlineCss.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });
    });
  });

});
