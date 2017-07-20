'use strict';

let assert = require('assert');
let har = require('../../help/har');
const harfileCorrect = 'mimeTypesCorrect.har';
const harfileIncorrect = 'mimeTypesIncorrect.har';
/*
In the harfileIncorrect file, the mimeType for the following resources were changed to 'blah''
https://run.sitespeed.io/img/logos/logoBig2.svg
*/
describe('Avoid incorrectly configured mime types', function() {
  it('We should be able to know incorrect mime types', function() {
    return har.firstAdviceForTestFile(harfileIncorrect).then(result => {
      assert.strictEqual(result.performance.adviceList.mimeTypes.score, 99);
    });
  });
  it('We should be able to know correct mime types', function() {
    return har.firstAdviceForTestFile(harfileCorrect).then(result => {
      assert.strictEqual(result.performance.adviceList.mimeTypes.score, 100);
      assert.strictEqual(
        result.performance.adviceList.mimeTypes.offending.length,
        0
      );
    });
  });
});
