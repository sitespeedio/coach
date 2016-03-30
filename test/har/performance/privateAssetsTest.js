'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid setting private headers on items that can be cached', function() {
  it('We should be able to find cache headers that are private', function() {
    return har.firstAdviceForTestFile('privateAssets.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.privateAssets.offending.length, 31);
      assert.strictEqual(result.performance.adviceList.privateAssets.score, 0);
    });
  });

  it('We should be able to know if headers are not private', function() {
    return har.firstAdviceForTestFile('privateAssets2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.privateAssets.score, 100);
    });
  });
});
