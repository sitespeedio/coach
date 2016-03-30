'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid multiple fonts on a page', function() {

  it('We should be able to find multiple fonts on a page', function() {
    return har.firstAdviceForTestFile('fewFonts.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.fewFonts.offending.length, 11);
      assert.strictEqual(result.performance.adviceList.fewFonts.score < 100, true);
    });
  });

  it('We should be able to know if there are no or just one font on a page', function() {
    return har.firstAdviceForTestFile('fewFonts2.har').then((result) => {
      assert.strictEqual(result.performance.adviceList.fewFonts.offending.length,0);
      assert.strictEqual(result.performance.adviceList.fewFonts.score , 100);
    });
  });



});
