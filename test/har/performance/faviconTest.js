'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Use favicon', function() {
  it('We should be able to know if we have a favicon', function() {
    return har.getHARresult('test/har/files/favicon.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.favicon.score, 100);
    });
  });

  it('We should be able to know if we we are missing favicon', function() {
    return har.getHARresult('test/har/files/favicon2.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.favicon.score, 0);
    });
  });
});
