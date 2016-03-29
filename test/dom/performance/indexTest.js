'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/performance/';

let BROWSERS = ['chrome', 'firefox'];

describe('Performance advice HTTP/1:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {
      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should find out CSS files not in head', function() {
        return bt.run(path + 'cssInHead.html', 'lib/dom/performance/cssInHead.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('We should find out if an image is scaled', function() {
        return bt.run(path + 'avoidScalingImages.html', 'lib/dom/performance/avoidScalingImages.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('We should find out if we load an print CSS', function() {
        return bt.run(path + 'cssPrint.html', 'lib/dom/performance/cssPrint.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('We should find out if can have SPOF', function() {
        return bt.run(path + 'spof.html', 'lib/dom/performance/spof.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 2);
          });
      });

      it('We should find out if we load third party JS sync', function() {
        return bt.run(path + 'thirdPartyAsyncJs.html', 'lib/dom/performance/thirdPartyAsyncJs.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('Multiple JQuerys that exists on the same page should be reported', function() {
        return bt.run(path + 'jquery.html', 'lib/dom/performance/jquery.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 2);
          });
      });

      it('We should be able to know if the page use user timings', function() {
        return bt.run(path + 'userTiming.html', 'lib/dom/performance/userTiming.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should be able to know if we inline CSS and request CSS files', function() {
        return bt.run(path + 'inlineCss.html', 'lib/dom/performance/inlineCss.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should know if we should combine CSS', function() {
        return bt.run(path + 'combineCss.html', 'lib/dom/performance/combineCss.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 0);
          });
      });

    });
  });

});
