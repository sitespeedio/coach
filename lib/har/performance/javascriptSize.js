'use strict';

let util = require('../util');

module.exports = {
  id: 'javascriptSize',
  title: "Total JavaScript size shouldn't be too big",
  description:
    'A lot of JavaScript often means you are downloading more than you need. How complex is the page and what can the user do on the page? Do you use multiple JavaScript frameworks?',
  weight: 5,
  tags: ['performance', 'javascript'],

  processPage: function(page) {
    let cssAssets = page.assets.filter(asset => asset.type === 'javascript');
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
      advice:
        score < 100
          ? 'The total JavaScript transfer size is ' +
            util.formatBytes(transferSize) +
            (contentSize > transferSize
              ? ' and the uncompressed size is ' + util.formatBytes(contentSize)
              : '') +
            '. ' +
            (contentSize > 1000000
              ? 'This is totally crazy! There is really room for improvement here.  '
              : 'This is quite large. ') +
            ''
          : ''
    };
  }
};
