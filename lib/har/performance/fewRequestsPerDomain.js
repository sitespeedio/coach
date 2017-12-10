'use strict';

let util = require('../util');

module.exports = {
  id: 'fewRequestsPerDomain',
  title: 'Avoid too many requests per domain [HTTP/1]',
  description:
    'Browsers have a limit on how many concurrent requests they can do per domain when using HTTP/1. When you hit the limit, the browser will wait before it can download more assets on that domain. So avoid having too many requests per domain.',
  weight: 5,
  tags: ['performance', 'HTTP/1'],
  processPage: function(page) {
    let limit = 30;
    if (util.isHTTP2(page)) {
      return {
        score: 100,
        offending: [],
        advice:
          'There are almost no limits on HTTP/2 connections with the number of requests, but that is not completely true. It depends on how they are downloaded. Please check your HAR file, does it look OK?'
      };
    }

    const infoPerDomain = page.domains;
    let offending = [];
    let domainAndRequests = {};
    let score = 100;
    let advice = '';
    Object.keys(infoPerDomain).reduce((result, domain) => {
      if (infoPerDomain[domain].requests > limit) {
        score -= 10;
        offending.push(domain);
        domainAndRequests[domain] = infoPerDomain[domain].requests;
      }
      return domainAndRequests;
    });

    if (score < 100) {
      advice =
        'The page has ' +
        offending.length +
        ' domain(s) that serves more than ' +
        limit +
        ' requests. ';

      Object.keys(domainAndRequests).forEach(function(domain) {
        advice += domain + ' got ' + domainAndRequests[domain] + ' requests. ';
      });
      advice += 'Improve performance by sharding those or move to HTTP/2.';
    }

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    };
  }
};
