'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid redirects for the assets', function() {

  it('We should be able to find redirects on assets', function() {
    return har.getHARresult('test/har/files/assetsRedirects.har').then((result) => {
      assert.strictEqual(result[0].performance.assetsRedirects.offending.length, 1);
      assert.strictEqual(result[0].performance.assetsRedirects.score < 100, true);
    });
  });

  it('We should be able to find if there are no redirects at all', function() {
    return har.getHARresult('test/har/files/assetsRedirects2.har').then((result) => {
      assert.strictEqual(result[0].performance.assetsRedirects.offending.length, 0);
      assert.strictEqual(result[0].performance.assetsRedirects.score, 100);
    });
  });
});
