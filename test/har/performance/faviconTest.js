'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Use favicon', function() {
  it('We should be able to know if we have a favicon', function() {
    return har.getHARresult('test/har/files/favicon.har').then((result) => {
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.favicon.score, 100);
    });
  });

  it('We should be able to know if we we are missing favicon', function() {
    // The favicon advice only work correct for Chrome
    return har.getHARresult('test/har/files/favicon2.har', undefined, {browser: 'chrome'}).then((result) => {
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.favicon.score, 0);
    });
  });
});
