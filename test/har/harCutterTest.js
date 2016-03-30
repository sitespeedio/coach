'use strict';
let assert = require('assert');
let harCutter = require('../../lib/har/harCutter').pickAPage;

let helper = require('../help/har');

describe('Test HAR cutter', function() {

  it('We should get the correct number of pages from the HAR cutter', function() {
    return helper.harFromTestFile('cacheHeaders.har').then((har) => {
      // the original har har two pages
      assert.strictEqual(har.log.pages.length, 2);
      let myHar = harCutter(har,0);
      assert.strictEqual(myHar.log.pages.length, 1);
      // the old har should have the same amount of pages
      assert.strictEqual(har.log.pages.length, 2);
    });
  });

  it('We should get the correct number of entries from the HAR cutter', function() {
    return helper.harFromTestFile('cacheHeaders.har').then((har) => {
      // the original har har two pages
      assert.strictEqual(har.log.entries.length, 212);
      let myHar = harCutter(har,0);
      // we got 175 entries with the page id page_1_0
      assert.strictEqual(myHar.log.entries.length, 175);
    });
  });

});
