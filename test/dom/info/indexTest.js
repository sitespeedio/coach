'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/info/';

let BROWSERS = ['chrome', 'firefox'];

describe('Info', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(30000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('Should be able to find the assets inside the head tag', function() {
        return bt.run(path + 'head.html', 'lib/dom/info/head.js')
          .then((result) => {
            assert.strictEqual(result.jssync.length, 1);
            assert.strictEqual(result.jsasync.length, 1);
            assert.strictEqual(result.css.length, 2);
          });
      });

      it('We should be able to identify a AMP page', function() {
        return bt.run(path + 'amp.html', 'lib/dom/info/amp.js')
          .then((result) => {
            assert.strictEqual(result, '1450396666888');
          });
      });

      it('We should be able to identify the connection type', function() {
        return bt.run(path + 'connectionType.html', 'lib/dom/info/connectionType.js')
          .then((result) => {
            if (browser === 'chrome') {
              assert.strictEqual(result !== 'unknown', true);
            }
          });
      });

      it('We should be able to find iframes', function() {
        return bt.run(path + 'iframes.html', 'lib/dom/info/iframes.js')
          .then((result) => {
            assert.strictEqual(result, 2);
          });
      });

      it('We should be able to get the title', function() {
        return bt.run(path + 'documentTitle.html', 'lib/dom/info/documentTitle.js')
          .then((result) => {
            assert.strictEqual(result, 'Document title');
          });
      });

      it('We should be able to get the document height', function() {
        return bt.run(path + 'documentHeight.html', 'lib/dom/info/documentHeight.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to get the document width', function() {
        return bt.run(path + 'documentWidth.html', 'lib/dom/info/documentWidth.js')
          .then((result) => {
            assert.strictEqual(result> 0, true);
          });
      });

      it('We should be able to count the DOM depth', function() {
        return bt.run(path + 'domDepth.html', 'lib/dom/info/domDepth.js')
          .then((result) => {
            assert.strictEqual(result.avg, 3);
            assert.strictEqual(result.max, 4);
          });
      });

      it('We should be able to get the DOM elements', function() {
        return bt.run(path + 'domElements.html', 'lib/dom/info/domElements.js')
          .then((result) => {
            assert.strictEqual(result, 26);
          });
      });

      it('We should be able to get the local storage size', function() {
        return bt.run(path + 'localStorageSize.html', 'lib/dom/info/localStorageSize.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to get the session storage size', function() {
        return bt.run(path + 'sessionStorageSize.html', 'lib/dom/info/sessionStorageSize.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to get the window size', function() {
        return bt.run(path + 'windowSize.html', 'lib/dom/info/windowSize.js')
          .then((result) => {
            assert.strictEqual(result != undefined, true);
          });
      });

      it('We should be able to get resource hints', function() {
        return bt.run(path + 'resourceHints.html', 'lib/dom/info/resourceHints.js')
          .then((result) => {
            assert.strictEqual(result.prerender[0], 'http://0.0.0.0:8282/info/amp.html','Could not fetch prerender');
            assert.strictEqual(result.preconnect[0], 'http://example.com/','Could not fetch preconnect');
            assert.strictEqual(result.prefetch[0], 'http://0.0.0.0:8282/info/js/body.js','Could not fetch prefetch');
            assert.strictEqual(result["dns-prefetch"][0], 'http://example.com/','Could not fetch dns-prefetch');
          });
      });
    });
  });
});
