'use strict';
let util = require('../util');

module.exports = {
  id: 'fewRequestsPerDomain',
  title: 'Avoid too many requests per domain',
  description: 'Using HTTP/1 browsers has a limit of number of concurrent requests per domain, so limit the amount.',
  weight: 5,
  tags: ['performance', 'HTTP/1'],
  processPage: function(page) {
    let limit = 30;
    if (util.isHTTP2(page))
      return {
        score: 100,
        offending: [],
        advice: 'There are almost no limits on HTTP/2 connections with the number of requests, but it is not completely true. It depends on how they are downloaded. Please check your HAR file, does it look ok?'
      };

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
    });

    if (score < 100) {
      advice = 'The page has ' + offending.length + ' domain(s) that serves more than 30 requests. ';

      Object.keys(domainAndRequests).forEach(function(domain) {
        advice += domain + ' got ' + domainAndRequests[domain] + ' requests. ';
      });
      advice += 'Improve performance by sharding those or move to HTTP/2.';
    }


    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    }
  }
};
