'use strict';
let util = require('../util');

const SKIPPABLE_DOMAINS = ['www.google-analytics.com'];

function processAsset(asset) {

  if (SKIPPABLE_DOMAINS.indexOf(util.getHostname(asset.url)) > -1) {
    return 0;
  } else if (asset.expires >= 2629740) {
    return 0;
  } else return asset.expires <= 0 ? 10 : 1;
}

module.exports = {
  id: 'cacheHeaders',
  title: 'Avoid extra requests by setting a cache headers',
  description: 'Cache responses longer than one 1 month is good.',
  weight: 10,
  tags: ['performance', 'server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      // Don't check the main page/document since it is common to not
      // cache that
      if (asset.url === page.finalUrl) {
        return;
      }
      let myScore = processAsset(asset);
      if (myScore > 0) {
        score -= myScore;
        offending.push(asset.url);
      }
    });

    return {
      score: score < 0 ? 0 : score,
      offending: offending,
      advice: score < 100 ? 'The page got ' + offending.length + ' request(s) that are missing or have a shorter cache time than 1 month.' : ''
    }
  }
};
