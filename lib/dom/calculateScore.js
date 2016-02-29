'use strict';

/*global results*/
(function(results) {
  var totalScore = 0,
    totalWeight = 0;

  Object.keys(results).forEach(function(result) {
    var categoryScore = 0,
      categoryWeight = 0,
      adviceList = results[result].adviceList;

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
      results[result].score = Math.round(categoryScore / categoryWeight)
    }
  });

  results.score = Math.round(totalScore / totalWeight);
})(results);
