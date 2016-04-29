'use strict';
let util = require('../util');

const SKIPPABLE_DOMAINS = ['www.google-analytics.com', 'ssl.google-analytics.com', 'analytics.twitter.com'];


module.exports = {
  id: 'cacheHeaders',
  title: 'Avoid extra requests by setting a cache headers',
  description: 'At least have some kind of cache headers!',
  weight: 30,
  tags: ['performance', 'server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    let saveSize = 0;
    page.assets.forEach(function(asset) {
      // Don't check the main page/document since it is common to not
      // cache that
      if (asset.url === page.finalUrl) {
        return;
      }

      if (SKIPPABLE_DOMAINS.indexOf(util.getHostname(asset.url)) === -1 && asset.expires <= 0) {
        // TODO we should check if the asset is set private, think the most logical would be to exclude them
        score -=10;
        saveSize += asset.transferSize;
        offending.push(asset.url);
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' request(s) that are missing a cache time. Configure a cache time so the browser doesn\'t need to download them every time. It will save ' + util.formatBytes(saveSize) + ' the next access.' : ''
    }
  }
};
