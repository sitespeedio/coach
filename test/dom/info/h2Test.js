'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');
let path = 'https://0.0.0.0:8383/info/';

let BROWSERS = ['chrome', 'firefox'];

describe('info - h2', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {
      before(() => bt.start(browser));

      after(() => bt.stop());

      it('Should be able to know if the connection is H2', function() {
        return bt.run(path + 'connectionType.html', 'lib/dom/info/connectionType.js')
          .then((result) => {
            assert.strictEqual(result === 'h2', true);
          });
      });
    });
  });
});
