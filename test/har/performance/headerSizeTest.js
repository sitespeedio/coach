'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Don\'t sen too much data in the headers', function() {
  it('We should be able to know if there are too large headers', function() {
    return har.getHARresult('test/har/files/headerSize.har').then((result) => {
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.headerSize.score, 100);
    });
  });

  it('We should be able to know if there are too large headers', function() {
    return har.getHARresult('test/har/files/headerSize2.har').then((result) => {
      assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.headerSize.score, 90);
        assert.strictEqual(result[0].coachAdvice.results.performance.adviceList.headerSize.offending.length ,1);
    });
  });


});
