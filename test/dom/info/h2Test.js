'use strict';

const createTestRunner = require('../../help/browsertimeRunner').createTestRunner,
    assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('info - h2', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'info', true);

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('Should be able to know if the connection is H2', function() {
        if (browser === 'firefox') {
          // Skip for now, since Firefox fails for local H2 sites (likely due to self signed cert)
          this.skip();
        }
        return runner.run('connectionType.js')
          .then((result) => {
            assert.strictEqual(result === 'h2', true);
          });
      });
    });
  });
});
