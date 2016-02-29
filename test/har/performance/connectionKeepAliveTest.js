'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Avoid closing a connection that can be used again', function() {
  it('We should be able to find connection close', function() {
    return har.getHARresult('test/har/files/connectionKeepAlive.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.connectionKeepAlive.offending.length, 39);
      assert.strictEqual(result[0].results.performance.adviceList.connectionKeepAlive.score, 0);
    });
  });

  it('We should be able to know if there are no connection close', function() {
    return har.getHARresult('test/har/files/connectionKeepAlive2.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.connectionKeepAlive.offending.length, 0);
      assert.strictEqual(result[0].results.performance.adviceList.connectionKeepAlive.score, 100);
    });
  });
});
