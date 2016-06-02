'use strict';

const createTestRunner = require('../../help/browsertimeRunner').createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Accessibility', function() {
  this.timeout(60000);

  BROWSERS.forEach(function(browser) {

    const runner = createTestRunner(browser, 'accessibility');

    describe('browser: ' + browser, function() {

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('Missing alt tags on an image should be reported', function() {
        return runner.run('altImages.js')
          .then((result) => {
            assert.strictEqual(result.offending.length, 1);
          });
      });

      it('We should be able to know if a meta tag suppresses zooming', function() {
        return runner.run('neverSuppressZoom.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if you miss adding a label on an input field', function() {
        return runner.run('labelOnInput.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to find tables without caption and th', function() {
        return runner.run('table.js')
          .then((result) => {
            assert.strictEqual(result.score, 85);
          });
      });

      it('We should be able to know if a page is missing landmarks', function() {
        return runner.run('landmarks.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if a page has a not logical heading structure', function() {
        return runner.run('headings.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to know if a page section structure is missing a header', function() {
        return runner.run('sections.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });
    });
  });
});
