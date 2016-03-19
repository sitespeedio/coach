'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Use cache headers', function() {
  it('We should be able to know if cache times are too short', function() {
    return har.getHARresult('test/har/files/cacheHeaders.har').then((result) => {
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.cacheHeadersLong.score, 68);
      // massive
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.cacheHeadersLong.offending.length, 32);
    });
  });


  it('We should be able to know if cache times are ok', function() {
    return har.getHARresult('test/har/files/cacheHeaders2.har').then((result) => {
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.cacheHeadersLong.score,100);

      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.cacheHeadersLong.offending.length, 0);
    });
  });

});
