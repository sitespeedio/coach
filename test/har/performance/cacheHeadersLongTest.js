'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Use cache headers', function() {
  it('We should be able to know if cache times are too short', function() {
    return har.firstAdviceForTestFile('cacheHeaders.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.cacheHeadersLong.score, 70);
      // massive
      assert.strictEqual(result.performance.adviceList.cacheHeadersLong.offending.length, 30);
    });
  });


  it('We should be able to know if cache times are ok', function() {
    return har.firstAdviceForTestFile('cacheHeaders2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.cacheHeadersLong.score,100);

      assert.strictEqual(result.performance.adviceList.cacheHeadersLong.offending.length, 0);
    });
  });

});
