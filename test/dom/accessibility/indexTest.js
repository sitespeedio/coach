'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/accessibility/';

let BROWSERS = ['chrome', 'firefox'];

describe('Accessibility:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(15000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('Missing alt tags on an image should be reported', function() {
        return bt.run(path + 'altImages.html', 'lib/dom/accessibility/altImages.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('We should be able to know if a meta tag supress zooming', function() {
        return bt.run(path + 'neverSuppressZoom.html', 'lib/dom/accessibility/neverSuppressZoom.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if you miss adding a label on a input field', function() {
        return bt.run(path + 'labelOnInput.html', 'lib/dom/accessibility/labelOnInput.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to find tables without caption and th', function() {
        return bt.run(path + 'table.html', 'lib/dom/accessibility/table.js')
          .then((result) => {
            assert.strictEqual(result.score, 85);
          });
      });

      it('We should be able to know if a page is missing landmarks', function() {
        return bt.run(path + 'landmarks.html', 'lib/dom/accessibility/landmarks.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if a page has a not logical heading structure', function() {
        return bt.run(path + 'headings.html', 'lib/dom/accessibility/headings.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

    });
  });

});
