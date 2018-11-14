'use strict';

module.exports = {
  id: 'manyHeaders',
  title: 'Avoid use too many response headers',
  description: 'Avoid send too many response headers.',
  weight: 1,
  tags: ['bestpractice', 'headers'],
  processPage: function(page) {
    const offending = [];
    let score = 100;
    let advice = '';
    page.assets.forEach(function(asset) {
      const headerNames = Object.keys(asset.headers.response);
      const maxHeaders = 30;
      // Report responses with more than 30 headers
      if (headerNames.length > maxHeaders) {
        offending.push(asset.url);
        score -= 1;
        advice += asset.url + ' has ' + headerNames.length + ' headers.';
      }
    });
    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    };
  }
};
