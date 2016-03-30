'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid redirects for the assets', function() {

  it('We should be able to find redirects on assets', function() {
    return har.firstAdviceForTestFile('assetsRedirects.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.assetsRedirects.offending.length, 26);
      assert.strictEqual(result.performance.adviceList.assetsRedirects.score < 100, true);
    });
  });

  it('We should be able to find if there are no redirects at all', function() {
    return har.firstAdviceForTestFile('assetsRedirects2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.assetsRedirects.offending.length, 0);
      assert.strictEqual(result.performance.adviceList.assetsRedirects.score, 100);
    });
  });
});
