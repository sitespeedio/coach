'use strict';
let util = require('../util');

module.exports = {
  id: 'fewRequestsPerDomain',
  title: 'Avoid too many requests per domain',
  description: 'Using HTTP/1 browsers has a limit of number of conncurrent requests per domain, so limit the amount.',
  weight: 5,
  tags: ['performance', 'HTTP/1'],
  processPage: function(page) {
    let limit = 30;
    if (util.isHttp2(page))
      return {
        score: 100,
        offending: [],
        advice: 'There are almost no limits on HTTP/2 connections with the numebr of requests, but it is not completely true. It depends on how parts of them are downloaded. Please check you HAR file, does it look ok?'
      };

    const infoPerDomain = page.domains;
    let offending = [];
    let score = 100;
    Object.keys(infoPerDomain).reduce((result, domain) => {
      if (infoPerDomain[domain].requests > limit) {
        score -= 10;
        offending.push(domain);
      }
    });

    return {
      score: score < 0 ? 0 : score,
      offending: offending,
      advice: score < 100 ? 'You got ' + offending.length + ' domains that serves more than 30 requests on that domain. Think you improve your performance if you try shard them more or move to HTTP/2' : ''
    }
  }
};
