'use strict';

let assert = require('assert');
let har = require('../../help/har');

describe('Find too long time spent in rendering', function() {
  it('We should be ble to find long time spent in rendering', function() {
    return har.firstAdviceForTestFile('cpuTime.har').then(result => {
      assert.strictEqual(
        result.performance.adviceList.cpuTimeSpentInRendering.score < 100,
        true
      );
    });
  });
});
