'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/performance/inlinecss/';

let BROWSERS = ['chrome', 'firefox'];

describe('Inline CSS advice HTTP/1:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {
      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should be able to know if we inline CSS and request CSS files', function() {
        return bt.run(path + 'inlineAndRequestCss.html', 'lib/dom/performance/inlineCss.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to know if we request CSS files', function() {
        return bt.run(path + 'noInlineAndRequestCss.html', 'lib/dom/performance/inlineCss.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

    });
  });

});
