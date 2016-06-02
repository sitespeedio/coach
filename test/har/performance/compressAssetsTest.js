'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Always compress text content', function() {
  it('We should be able to know that all content is compressed', function() {
    return har.firstAdviceForTestFile('compressAssets.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.compressAssets.offending.length, 0);
      assert.strictEqual(result.performance.adviceList.compressAssets.score, 100);
    });
  });


  it('We should be able to find content that is not compressed', function() {
    return har.firstAdviceForTestFile('compressAssets2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.compressAssets.score < 100, true );
    });
  });

});
