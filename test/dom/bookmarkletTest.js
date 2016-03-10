'use strict';
let bt = require('../help/browsertime');

let path = 'http://0.0.0.0:8282/combined/';

let BROWSERS = ['chrome', 'firefox'];

let SCRIPT_NAME = 'dist/bookmarklet.js';

describe('Bookmarklet script [' + SCRIPT_NAME + ']', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(60000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should be able to run the bookmarklet', function() {
        return bt.run(path + 'index.html', SCRIPT_NAME)
          .then(() => {
          });
      });
    });
  });

});
