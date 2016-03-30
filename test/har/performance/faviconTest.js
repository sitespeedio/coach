'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Use favicon', function() {
  it('We should be able to know if we have a favicon', function() {
    return har.firstAdviceForTestFile('favicon.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.favicon.score, 100);
    });
  });

  it('We should be able to know if we we are missing favicon', function() {
    // The favicon advice only work correct for Chrome
    return har.firstAdviceForTestFile('favicon2.har', {browser: 'chrome'}).then((result) => {
      assert.strictEqual(result.performance.adviceList.favicon.score, 0);
    });
  });
});
