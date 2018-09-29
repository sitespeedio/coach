'use strict';

let util = require('../util');

module.exports = {
  id: 'optimalCssSize',
  title: 'Make each CSS response small',
  description:
    'Make CSS responses small to fit into the magic number TCP window size of 14.5 KB. The browser can then download the CSS faster and that will make the page start rendering earlier.',
  weight: 3,
  tags: ['performance', 'css'],

  processPage: function(page) {
    let cssAssets = page.assets.filter(asset => asset.type === 'css');
    let transferLimit = 14500;
    let score = 100;
    let advice = '';
    let offending = [];

    cssAssets.forEach(function(asset) {
      if (asset.transferSize > transferLimit) {
        score -= 10;
        offending.push(asset.url);
        advice +=
          asset.url +
          ' size is ' +
          util.formatBytes(asset.transferSize) +
          ' (' +
          asset.transferSize +
          ') and that is bigger than the limit of ' +
          util.formatBytes(transferLimit) +
          '. ';
      }
    });

    if (score < 100) {
      advice += 'Try to make the CSS files fit into 14.5 KB.';
    }

    if (score < 0) {
      score = 0;
    }

    return {
      score,
      offending,
      advice
    };
  }
};
