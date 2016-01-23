'use strict';
let util = require('../util');

module.exports = {
  id: 'connectionKeepAlive',
  title: 'Don\'t close a connection that is used multiple times',
  description: 'Use keep alive headers & don\'t close the connection when we have multiple requests to one and the same domain',
  weight: 5,
  tags: ['performance', 'server'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    let avoid = 'doc';

    let closedPerDomain = {};
    page.assets.forEach(function(asset) {
      const connectionHeader = asset.headers.response.connection || '';
      if (asset.type !== avoid && connectionHeader.indexOf('close') > -1) {
        const hostname = util.getHostname(asset.url);
        if (!closedPerDomain[hostname]) {
          closedPerDomain[hostname] = 1;
          // TODO these assets should be reported too
        } else {
          closedPerDomain[hostname] += 1;
          offending.push(asset.url);
          score -= 10;
        }
      }
    });
    return {
      score: score < 0 ? 0 : score,
      offending: offending,
      advice : score < 100 ? 'The page got ' + offending.length + ' requests that are done to a domain where the connection already has been closed. Don\'t close the connection and reuse the connection!' : ''
    }
  }
};
