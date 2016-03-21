'use strict';
let util = require('../util');

module.exports = {
  id: 'cssSize',
  title: 'Total CSS size shouldn\'t be too big',
  description: 'A lot CSS will make the rendering slower, because there\'s more things to do for the browser before it can start paint the screen.',
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
      advice: score < 100 ? 'The page total CSS transfer size is ' + util.formatBytes(transferSize) + '. That is really big and the CSS could most probably be smaller.' : ''
    };
  }

};
