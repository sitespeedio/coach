'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Search for strict transport security header', function() {
  it('We should be able to find strict transport security header', function() {
    return har
      .firstAdviceForTestFile('strictTransportSecurityHeader.har')
      .then(result => {
        assert.strictEqual(
          result.privacy.adviceList.strictTransportSecurityHeader.offending
            .length,
          0
        );
        assert.strictEqual(
          result.privacy.adviceList.strictTransportSecurityHeader.score,
          70
        );
      });
  });
});
