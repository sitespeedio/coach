'use strict';
let util = require('../util');

const SKIPPABLE_DOMAINS = ['www.google-analytics.com', 'ssl.google-analytics.com', 'analytics.twitter.com'];

function processAsset(asset) {
  if (SKIPPABLE_DOMAINS.indexOf(util.getHostname(asset.url)) > -1) {
    return 0;
  }

  if (asset.expires <= 0) {
    return 10;
  }
}

module.exports = {
  id: 'cacheHeaders',
  title: 'Avoid extra requests by setting a cache headers',
  description: 'At least have some kind of cache headers!',
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
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' request(s) that are missing a configured cache time' : ''
    }
  }
};
