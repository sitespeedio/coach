'use strict';

const merge = require('lodash.merge');

function recalculateScore(results) {
  var totalScore = 0,
    totalWeight = 0;

  Object.keys(results.advice).forEach((result) => {
    const category = results.advice[result];
    var categoryScore = 0,
      categoryWeight = 0,
      adviceList = category.adviceList;

    if (adviceList) {
      Object.keys(adviceList).forEach((adviceName) => {
        var advice = adviceList[adviceName];

        totalScore += advice.score * advice.weight;
        categoryScore += advice.score * advice.weight;

        totalWeight += advice.weight;
        categoryWeight += advice.weight;
      });
    }
    if (categoryWeight > 0) {
      category.score = Math.round(categoryScore / categoryWeight)
    }
  });

  results.advice.score = Math.round(totalScore / totalWeight);
  return results;
}

module.exports = {
  merge(domResult, harResult) {
    const result = merge(domResult, harResult[0]);
    return recalculateScore(result);
  }
};
