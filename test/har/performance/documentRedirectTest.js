'use strict';
let assert = require('assert');
let har = require('../../help/har');


describe('Never do redirects on the main document', function() {

  it('We should be able to find out if page don\'t do a redirect', function() {
    return har.getHARresult('test/har/files/documentRedirect.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.documentRedirect.score, 100);
    });
  });

  it('We should be able to find redirects on a the main document', function() {
    return har.getHARresult('test/har/files/documentRedirect2.har').then((result) => {
      assert.strictEqual(result[0].results.performance.adviceList.documentRedirect.score, 0);
    });
  });


});
