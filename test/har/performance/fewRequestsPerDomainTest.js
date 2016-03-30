'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid loading too many assets from one domain on HTTP/1', function() {
  it('We should be able to find to many assets on one domain', function() {
    return har.firstAdviceForTestFile('fewRequestsPerDomain.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.fewRequestsPerDomain.offending.length, 1);
      assert.strictEqual(result.performance.adviceList.fewRequestsPerDomain.score < 100, true);
    });
  });

  it('We should be able to find to many assets on one domain', function() {
    return har.firstAdviceForTestFile('fewRequestsPerDomain2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.fewRequestsPerDomain.offending.length, 0);
      assert.strictEqual(result.performance.adviceList.fewRequestsPerDomain.score, 100);
    });
  });
});
