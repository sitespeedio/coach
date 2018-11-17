'use strict';

const createTestRunner = require('../../help/browsertimeRunner')
    .createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Privacy', function() {
  this.timeout(60000);

  BROWSERS.forEach(function(browser) {
    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'privacy');

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('We should be able to detect if a web page is served using HTTPS', function() {
        return runner.run('https.js').then(result => {
          assert.strictEqual(result.score, 0);
        });
      });
    });
  });
});
