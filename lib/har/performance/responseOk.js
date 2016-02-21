'use strict';

function processAsset(asset) {
  if (asset.status <= 399)
    return 0;
  if (asset.status <= 499)
    return 10;
  return 20;
}

module.exports = {
  id: 'responseOk',
  title: 'Avoid missing and error requests',
  description: 'Check for 40X and 50X responses, and report them.',
  weight: 7,
  tags: ['performance','server'],

  processPage: function(page) {
    let score = 100;
    let errors = 0;
    let missing = 0;
    let offending = [];
    page.assets.forEach(function(asset) {
      let myScore = processAsset(asset);
      if (myScore > 0) {
        score -= myScore;
        offending.push(asset.url);
        if (myScore === 20) {
          errors++;
        }
        else {
          missing++;
        }
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + errors + ' 50X and ' + missing + ' 40X.' : ''
    }
  }
};
