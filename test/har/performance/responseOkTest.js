'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid 40X and 50X', function() {
  it('We should be able to know if we have an error in one request', function() {
    return har.getHARresult('test/har/files/responseOk.har').then((result) => {
      assert.strictEqual(result[0].performance.responseOk.score, 90);
      assert.strictEqual(result[0].performance.responseOk.offending.length, 1);
    });
  });

  it('We should be able to know if there are no errors', function() {
    return har.getHARresult('test/har/files/responseOk2.har').then((result) => {
      assert.strictEqual(result[0].performance.responseOk.score, 100);
      assert.strictEqual(result[0].performance.responseOk.offending.length, 0);
    });
  });

});
