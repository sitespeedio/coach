'use strict';
let util = require('../util');

module.exports = {
  id: 'optimalCssSize',
  title: 'Make each CSS response small',
  description: 'Making CSS requests small are to fit into the magic number TCP window size 14.5 kB.',
  weight: 3,
  tags: ['performance', 'css'],

  processPage: function(page) {

    let cssAssets = page.assets.filter((asset) => asset.type === 'css');
    let transferLimit = 14500;
    let score = 100;
    let advice = '';
    let offending = [];

    cssAssets.forEach(function(asset) {
      if (asset.transferSize > transferLimit) {
        score -= 10;
        offending.push(asset.url);
        advice += asset.url + ' size is ' + util.formatBytes(asset.transferSize) + ' and that is bigger than the limit of ' + util.formatBytes(transferLimit) + '. '
      }
    });

    if (score < 100) {
      advice += 'Try to make the CSS files fit into 14.5 kb.';
    }

    return {
      score,
      offending,
      advice
    };
  }

};
