'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Don\'t send too much JS to the browser', function() {
  it('We should be able to know if there are too much JS', function() {
    return har.getHARresult('test/har/files/javascriptSize.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.javascriptSize.score, 50);
    });
  });

  it('We should be able to know if there are too much JS', function() {
    return har.getHARresult('test/har/files/javascriptSize2.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.javascriptSize.score, 100);
    });
  });

});
