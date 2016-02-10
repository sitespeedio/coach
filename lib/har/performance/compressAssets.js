'use strict';

let types = ['doc', 'json', 'js', 'css'];

function processAsset(asset) {
  if (types.indexOf(asset.type) > -1) {
    const encoding = asset.headers.response['content-encoding'] || '';
    // TODO we should test the size, for small assets it doesn't matter
    if (encoding !== 'gzip' && encoding !== 'deflate') {
      return 10;
    }
  }
  return 0;
}

module.exports = {
  id: 'compressAssets',
  title: 'Always compress text content',
  description: 'Send content compressed over the wire to save bytes',
  weight: 8,
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
      advice: score < 100 ? 'The page got ' + offending.length + ' requests that are served uncompressed. You can save a lot of bytes by sending them compressed instead.' : ''
    }
  }
};
