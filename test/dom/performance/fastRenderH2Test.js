'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'https://0.0.0.0:8383/performance/fastrender/';

let BROWSERS = ['chrome', 'firefox'];

describe('Fast render advice HTTP/2:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {
      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should know that synchronously Javscript makes the page render slower', function() {
        return bt.run(path + '/avoidJSSyncInHead.html', 'lib/dom/performance/fastRender.js')
          .then((result) => {
            // In H2 world we don't hurt CSS, we hope it is pushed.
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('We should know that loading javascript async is ok', function() {
        return bt.run(path + 'jsAsyncIsOk.html', 'lib/dom/performance/fastRender.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 0);
          });
      });
    });
  });

});
