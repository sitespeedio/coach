'use strict';
let util = require('../util');

module.exports = {
  id: 'headerSize',
  title: 'Response headers should\'t be too big',
  description: 'Avoid a lot of cookies and other stuff that makes your headers big.',
  weight: 4,
  tags: ['performance', 'mobile'],
  processPage: function(page) {

    // H2 sends headers compressed and we don't get the right size now
    // so it's better just to skip those
    if (util.isHTTP2(page)) {
      return {
        score: 100,
        offending: [],
        advice: 'The page uses an HTTP/2 connection and the headers are sent compressed, that\'s good. And with the current version cannot say if the size is good or not.'
      };
    } else {

    let limit = 20000;
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      if (asset.headerSize > limit) {
        offending.push(asset.url);
        score -= 10;
      }
    });
    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' responses with a header size larger than ' + util.formatBytes(limit) + '. You should really look into how to minimize the number of cookies sent.' : ''
    };
  }
  }
};
