'use strict';
let util = require('../util');

module.exports = {
  id: 'javascriptSize',
  title: 'Total Javascript size shouldn\'t be too big',
  description: '',
  weight: 5,
  tags: ['performance', 'javascript'],

  processPage: function(page) {

    let cssAssets = page.assets.filter((asset) => asset.type === 'javascript');
    let transferSize = 0;
    let contentSize = 0;
    let transferLimit = 120000;
    let contentLimit = 500000;
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
      advice: score < 100 ? 'The page total Javascript transfer size is ' + util.formatBytes(transferSize) + ' & the total content size is ' + util.formatBytes(contentSize) + '. That is really big and you should check what you can do to make it smaller.' : ''
    };
  }

};
