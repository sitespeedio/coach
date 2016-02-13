'use strict';
let bt = require('../help/browsertime');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/combined/';

let BROWSERS = ['chrome', 'firefox'];

let SCRIPT_NAME = 'dist/coach.min.js';

describe('Combined minified script [' + SCRIPT_NAME + ']', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(30000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should have a combined score for all categories', function() {
        return bt.run(path + 'index.html', SCRIPT_NAME)
          .then((result) => {
              assert.strictEqual(result.score > 0, true);
          });
      });

      it('We should have a average score for performance', function() {
        return bt.run(path + 'index.html', SCRIPT_NAME)
          .then((result) => {
              assert.strictEqual(result.performance.score > 0, true);
          });
      });

      it('We should have a average score for accessibility', function() {
        return bt.run(path + 'index.html', SCRIPT_NAME)
          .then((result) => {
              assert.strictEqual(result.accessibility.score > 0, true);
          });
      });

    });
  });

});
