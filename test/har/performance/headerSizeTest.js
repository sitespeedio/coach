'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Don\'t send too much data in the headers', function() {
  it('We should be able to know if there are too large headers', function() {
    return har.firstAdviceForTestFile('headerSize.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.headerSize.score, 100);
    });
  });

  it('We should be able to know if there are too large headers', function() {
    return har.firstAdviceForTestFile('headerSize2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.headerSize.score, 90);
      assert.strictEqual(result.performance.adviceList.headerSize.offending.length ,1);
    });
  });

});
