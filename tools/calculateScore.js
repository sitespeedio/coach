'use strict';

/*global advice*/
(function(advice) {
  var totalScore = 0,
    totalWeight = 0;

  Object.keys(advice).forEach(function(category) {
    var categoryScore = 0,
      categoryWeight = 0,
      adviceList = advice[category].adviceList;

    if (adviceList) {
      Object.keys(adviceList).forEach(function(adviceName) {
        var advice = adviceList[adviceName];

        totalScore += advice.score * advice.weight;
        categoryScore += advice.score * advice.weight;

        totalWeight += advice.weight;
        categoryWeight += advice.weight;
      });
    }
    if (categoryWeight > 0) {
      advice[category].score = Math.round(categoryScore / categoryWeight)
    }
  });

  advice.score = Math.round(totalScore / totalWeight);
})(advice);
