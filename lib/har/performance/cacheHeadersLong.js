'use strict';

let util = require('../util');

const SKIPPABLE_DOMAINS = [
  'www.google-analytics.com',
  'ssl.google-analytics.com',
  'analytics.twitter.com'
];

function processAsset(asset) {
  if (SKIPPABLE_DOMAINS.indexOf(util.getHostname(asset.url)) > -1) {
    return 0;
  } else if (asset.expires >= 2592000) {
    return 0;
  } else if (asset.expires <= 0) {
    // this is caught in cacheHeaders so let's skip giving advice
    // about them
    return 0;
  } else {
    return 1;
  }
}

module.exports = {
  id: 'cacheHeadersLong',
  title: 'Long cache headers is good',
  description:
    'Setting a cache header is good. Setting a long cache header (at least 30 days) is even better beacause then it will stay long in the browser cache. But what do you do if that asset change? Rename it and the browser will pick up the new version.',
  weight: 3,
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
      advice:
        score < 100
          ? 'The page has ' +
            offending.length +
            ' request(s) that have a shorter cache time than 30 days (but still a cache time).'
          : ''
    };
  }
};
