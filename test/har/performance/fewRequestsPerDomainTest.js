'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid loading too many assets from one domain on HTTP/1', function() {
  it('We should be able to find to many assets on one domain', function() {
    return har.getHARresult('test/har/files/fewRequestsPerDomain.har').then((result) => {
      assert.strictEqual(result[0].performance.fewRequestsPerDomain.offending.length, 1);
      assert.strictEqual(result[0].performance.fewRequestsPerDomain.score < 100, true);
    });
  });

  it('We should be able to find to many assets on one domain', function() {
    return har.getHARresult('test/har/files/fewRequestsPerDomain2.har').then((result) => {
      assert.strictEqual(result[0].performance.fewRequestsPerDomain.offending.length, 0);
      assert.strictEqual(result[0].performance.fewRequestsPerDomain.score, 100);
    });
  });
});
