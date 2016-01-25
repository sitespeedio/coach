'use strict';

module.exports = {
  id: 'cssSize',
  title: 'Total CSS size shouldn\'t be too big',
  description: '',
  weight: 5,
  tags: ['performance', 'css'],

  processPage: function(page) {

    let cssAssets = page.assets.filter((asset) => asset.type === 'css');
    let transferSize = 0;
    let contentSize = 0;
    let transferLimit = 120000;
    let contentLimit = 400000;
    let score = 100;

    cssAssets.forEach(function(asset) {
      transferSize += asset.transferSize;
      contentSize += asset.contentSize;
    });

    if (transferSize > transferLimit) {
      score -= 50;
    }

    if (contentSize > contentLimit) {
      score -= 50;
    }

    return {
      score: score,
      offending: [],
      advice: score < 100 ? 'The pahe total CSS transfer size is ' + transferSize + ' & the total content size is ' + contentSize + '. That is really big and the CSS could most probably be smaller.' : ''
    };
  }

};
