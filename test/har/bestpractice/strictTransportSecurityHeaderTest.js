'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Search for strict transport security header', function() {
  it('We should be able to find strict transport security header', function() {
    return har
      .firstAdviceForTestFile('strictTransportSecurityHeader.har')
      .then(result => {
        assert.strictEqual(
          result.bestpractice.adviceList.strictTransportSecurityHeader.offending
            .length,
          0
        );
        assert.strictEqual(
          result.bestpractice.adviceList.strictTransportSecurityHeader.score,
          100
        );
      });
  });
});
