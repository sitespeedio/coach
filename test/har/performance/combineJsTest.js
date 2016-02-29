'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid multiple Javascript request on a page', function() {

  it('We should be able to find multiple Javascript requests on a page', function() {
    return har.getHARresult('test/har/files/combineJs.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.combineJs.offending.length, 66);
      assert.strictEqual(result[0].results.performance.adviceList.combineJs.score < 100, true);
    });
  });

  it('We should be able to know if no Javascript requests are done', function() {
    return har.getHARresult('test/har/files/combineJs2.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.combineJs.offending.length, 0);
      assert.strictEqual(result[0].results.performance.adviceList.combineJs.score, 100);
    });
  });

});
