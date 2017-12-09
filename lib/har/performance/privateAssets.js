'use strict';

let types = ['json', 'javascript', 'css', 'image', 'svg', 'font', 'html'];

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
  title: "Don't use private headers on static content",
  description:
    'If you set private headers on content, that means that the content are specific for that user. Static content should be able to be cached and used by everyone. Avoid setting the cache header to private.',
  weight: 5,
  tags: ['performance', 'server'],
  processPage: function(page) {
    let advice = '';
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      let myScore = processAsset(asset);
      if (myScore > 0 && page.url !== asset.url) {
        score -= myScore;
        offending.push(asset.url);
      } else if (myScore > 0 && page.url === asset.url) {
        offending.push(asset.url);
        advice =
          'The main page has a private header. It could be right in some cases where the user can be logged in and served specific content. But if your asset is static it should never be private. ';
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice:
        score < 100
          ? 'The page has ' +
            offending.length +
            ' request(s) with private headers. ' +
            advice +
            'Make sure that the assets really should be private and only used by one user. Otherwise, make it cacheable for everyone.'
          : advice
    };
  }
};
