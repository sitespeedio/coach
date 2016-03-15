'use strict';
let merge = require('../../lib/merge').merge;
let assert = require('assert');

let domResult = require('./files/domResult.json');
let harResult = require('./files/harResult.json');

describe('Merging DOM and HAR results', function() {
  it('We should have the right amount of performance advice', function() {

    let domPerformanceAdvice = Object.keys(domResult.coachAdvice.results.performance.adviceList).length;
    let harPerformanceAdvice = Object.keys(harResult[0].coachAdvice.results.performance.adviceList).length;
    let result = merge(domResult, harResult);

    assert.strictEqual(Object.keys(result.coachAdvice.results.performance.adviceList).length, domPerformanceAdvice + harPerformanceAdvice);
  });

  it('The performance score should be right ', function() {
    let result = merge(domResult, harResult);
    assert.strictEqual(result.coachAdvice.results.performance.score, 99);
  });

  it('The total score should be right ', function() {
    let result = merge(domResult, harResult);
    assert.strictEqual(result.coachAdvice.results.score, 98);
  });
});
