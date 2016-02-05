'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid too many CSS requests on a page', function() {

  it('We should be able to find multiple CSS requests', function() {
    return har.getHARresult('test/har/files/combineCss.har').then((result) => {
      assert.strictEqual(result[0].performance.adviceList.combineCss.offending.length, 3);
      assert.strictEqual(result[0].performance.adviceList.combineCss.score < 100, true);
    });
  });

  it('We should be able to know if there are no CSS requests', function() {
    return har.getHARresult('test/har/files/combineCss2.har').then((result) => {
      assert.strictEqual(result[0].performance.adviceList.combineCss.offending.length, 0);
      assert.strictEqual(result[0].performance.adviceList.combineCss.score, 100);
    });
  });

});
