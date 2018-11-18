'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Search for referrer policy header', function() {
  it('We should be able to find if we do not have a referrer policy header', function() {
    return har.firstAdviceForTestFile('manyHeaders.har').then(result => {
      assert.strictEqual(
        result.privacy.adviceList.referrerPolicyHeader.offending.length,
        1
      );
      assert.strictEqual(
        result.privacy.adviceList.referrerPolicyHeader.score,
        0
      );
    });
  });

  it('We should be able to find a referrer policy header', function() {
    return har.firstAdviceForTestFile('referrerPolicy.har').then(result => {
      assert.strictEqual(
        result.privacy.adviceList.referrerPolicyHeader.offending.length,
        0
      );
      assert.strictEqual(
        result.privacy.adviceList.referrerPolicyHeader.score,
        100
      );
    });
  });
});
