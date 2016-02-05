'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid bloated pages', function() {
  it('We should be able to know if a page is not too large', function() {
    return har.getHARresult('test/har/files/pageSize.har').then((result) => {
      assert.strictEqual(result[0].performance.adviceList.pageSize.score, 100);
    });
  });

  it('We should be able to know if a page is too large', function() {
    return har.getHARresult('test/har/files/pageSize2.har').then((result) => {
      assert.strictEqual(result[0].performance.adviceList.pageSize.score,0);
    });
  });

});
