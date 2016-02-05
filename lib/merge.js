'use strict';

const merge = require('lodash.merge');

function recalculateScore(results) {

  // lets recalculate everything

  let totalScore = 0;
  let totalWeight = 0;

  Object.keys(results).forEach(function(result) {
    let categoryWeight = 0;
    let categoryScore = 0;
    if (results[result].adviceList) {
      Object.keys(results[result].adviceList).forEach(function(advice) {
        if (results[result].adviceList[advice].score >= 0) {
          totalWeight += results[result].adviceList[advice].weight;
          categoryWeight += results[result].adviceList[advice].weight;

          if (results[result].adviceList[advice].score !== 0) {
            totalScore += results[result].adviceList[advice].score * results[result].adviceList[advice].weight;
            categoryScore += results[result].adviceList[advice].score * results[result].adviceList[advice].weight;
          }
        }
      });
    }
    if (categoryWeight > 0) {
      results[result].score = Math.round(categoryScore / categoryWeight)
    }
  });

  results.score = Math.round(totalScore / totalWeight);
  return results;
}

module.exports = {
  merge(domResult, harResult) {
    const result = merge(domResult, harResult[0]);
    return recalculateScore(result);
  }
};
