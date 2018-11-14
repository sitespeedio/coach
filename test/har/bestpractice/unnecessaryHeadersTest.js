'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Investigate response headers for headers we do not need', function() {
  it('We should find headers that we do not need', function() {
    return har.firstAdviceForTestFile('unnecessaryHeaders.har').then(result => {
      assert.strictEqual(
        result.bestpractice.adviceList.unnecessaryHeaders.offending.length,
        4
      );
      assert.strictEqual(
        result.bestpractice.adviceList.unnecessaryHeaders.score,
        96
      );
    });
  });
});
