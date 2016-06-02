'use strict';

const createTestRunner = require('../help/browsertimeRunner').createTestRunner,
  path = require('path');

let BROWSERS = ['chrome', 'firefox'];

let SCRIPT_NAME = 'domconsole.js',
  scriptPath = path.resolve(__dirname, '..', '..', 'dist', SCRIPT_NAME);

describe('Bookmarklet script [' + SCRIPT_NAME + ']', function() {
  this.timeout(60000);

  BROWSERS.forEach(function(browser) {

    describe('browser: ' + browser, function() {
      const runner = createTestRunner(browser, 'combined');

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('We should be able to run the bookmarklet', function() {
        return runner.run(scriptPath, 'index.html');
      });
    });
  });

});
