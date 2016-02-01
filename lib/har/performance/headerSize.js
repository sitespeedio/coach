'use strict';

module.exports = {
  id: 'headerSize',
  title: 'Response headers should\'t be too big',
  description: '',
  weight: 4,
  tags: ['performance', 'mobile'],
  processPage: function(page) {
    let limit = 20000;
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      if (asset.headerSize > limit) {
        offending.push(asset.url);
        score -= 10;
      }
    });
    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page got ' + offending.length + ' responses with a header size larger than ' + limit + ' bytes. You should really look into how to minimize the number of cookies sent.' : ''
    };
  }
};
