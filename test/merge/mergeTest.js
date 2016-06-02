'use strict';
let merge = require('../../lib/merge').merge;
let assert = require('assert');

let domResult = require('./files/domResult.json');
let harResult = require('./files/harResult.json');
let harResultOverride = require('./files/harResultOverride.json');

describe('Merging DOM and HAR results', function() {
  it('We should have the right amount of performance advice', function() {

    let domPerformanceAdvice = Object.keys(domResult.advice.performance.adviceList).length;
    let harPerformanceAdvice = Object.keys(harResult[0].advice.performance.adviceList).length;
    let result = merge(domResult, harResult);

    assert.strictEqual(Object.keys(result.advice.performance.adviceList).length, domPerformanceAdvice + harPerformanceAdvice);
  });

  it('The performance score should be right', function() {
    let result = merge(domResult, harResult);
    assert.strictEqual(result.advice.performance.score, 99);
  });

  it('The total score should be right', function() {
    let result = merge(domResult, harResult);
    assert.strictEqual(result.advice.score, 98);
  });

  it('HAR result advice should override DOM advice', function() {
    let result = merge(domResult, harResultOverride);
    assert.strictEqual(result.advice.performance.adviceList.altImages.title, 'altImages from HAR');
  });
});
