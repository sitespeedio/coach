'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Investigate response headers for headers we do not need', function() {
  it('We should find headers that we do not need', function() {
    return har.firstAdviceForTestFile('unnecessaryHeaders.har').then(result => {
      assert.strictEqual(
        result.bestpractice.adviceList.unnecessaryHeaders.offending.length,
        17,
        result.bestpractice.adviceList.unnecessaryHeaders.advice
      );
      assert.strictEqual(
        result.bestpractice.adviceList.unnecessaryHeaders.score,
        83,
        result.bestpractice.adviceList.unnecessaryHeaders.advice
      );
    });
  });
});
