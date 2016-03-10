'use strict';
let bt = require('../help/browsertime'),
  assert = require('assert'),
  path = require('path');

let url = 'http://0.0.0.0:8282/combined/';

let BROWSERS = ['chrome', 'firefox'];

let SCRIPT_NAME = 'coach.min.js';

describe('Combined minified script [' + SCRIPT_NAME + ']', function() {

  const scriptPath = path.resolve(__dirname, '..', '..', 'dist', SCRIPT_NAME);

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(60000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should have a combined score for all categories', function() {
        return bt.run(url + 'index.html', scriptPath)
          .then((result) => {
              assert.strictEqual(result.results.score > 0, true);
          });
      });

      it('We should have a average score for performance', function() {
        return bt.run(url + 'index.html', scriptPath)
          .then((result) => {
              assert.strictEqual(result.results.performance.score > 0, true);
          });
      });

      it('We should have a average score for accessibility', function() {
        return bt.run(url + 'index.html', scriptPath)
          .then((result) => {
              assert.strictEqual(result.results.accessibility.score > 0, true);
          });
      });

    });
  });

});
