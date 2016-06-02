'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Don\'t send too many JavaScript files to the browser', function() {
  it('We should be able to know if there are too many JavaScript files', function() {
    return har.firstAdviceForTestFile('javascriptSize.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.javascriptSize.score, 50);
    });
  });

  it('We should be able to know if there are too many JavaScript files', function() {
    return har.firstAdviceForTestFile('javascriptSize2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.javascriptSize.score, 100);
    });
  });

});
