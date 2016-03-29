'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/performance/';

let BROWSERS = ['chrome', 'firefox'];

describe('Fast render advice HTTP/1:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {
      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should know that synchronously Javscript makes the page render slower', function() {
        return bt.run(path + 'fastrender/avoidJSSyncInHead.html', 'lib/dom/performance/fastRender.js')
          .then((result) => {
            // CSS and JS sync hurts in the H1 world
            assert.strictEqual(result.offending.length, 2);
          });
      });

    });
  });

});
