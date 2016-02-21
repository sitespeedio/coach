'use strict';

let types = ['json', 'javascript', 'css', 'image', 'svg', 'font'];

function processAsset(asset) {
  if (types.indexOf(asset.type) > -1) {
    const cacheControl = asset.headers.response['cache-control'] || '';
    if (cacheControl.indexOf('private') > -1) {
      return 10;
    }
  }
  return 0;
}

module.exports = {
  id: 'privateAssets',
  title: 'Don\'t use private headers on static content',
  description: 'Static content should be able to be cached & used by everyone.',
  weight: 5,
  tags: ['performance', 'server'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      let myScore = processAsset(asset);
      if (myScore > 0) {
        score -= myScore;
        offending.push(asset.url);
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' requests with private headers. That doesn\'t seems to be right, they are cacheable for that specific user and not for everyone.' : ''
    }
  }
};
