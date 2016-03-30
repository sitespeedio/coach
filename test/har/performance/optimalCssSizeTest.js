'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Don\'t let the CSS files be too large', function() {
  it('We should be able to know if a CSS file is too large', function() {
    return har.firstAdviceForTestFile('optimalCssSize.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.optimalCssSize.score, 90);
    });
  });

  it('We should be able to know if a CSS file is too large', function() {
    return har.firstAdviceForTestFile('optimalCssSize2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.optimalCssSize.score, 80);
    });
  });
});
