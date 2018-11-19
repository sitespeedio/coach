'use strict';

module.exports = {
  id: 'longHeaders',
  title: 'Do not send too long headers',
  description: 'Do not send response headersthat are too long.',
  weight: 1,
  tags: ['bestpractice', 'header'],
  processPage: function(page) {
    const offending = [];
    let score = 100;
    let advice = '';
    page.assets.forEach(function(asset) {
      const headerNames = Object.keys(asset.headers.response);
      const maxHeaderLength = 600;
      for (let name of headerNames) {
        if (asset.headers.response[name].length > maxHeaderLength) {
          offending.push(asset.url);
          score -= 1;
          advice +=
            asset.url +
            ' has ' +
            name +
            ' that is ' +
            asset.headers.response[name].length +
            ' characters long. ';
        }
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    };
  }
};
