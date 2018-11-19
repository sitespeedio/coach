'use strict';

module.exports = {
  id: 'referrerPolicyHeader',
  title:
    'Set a referrer-policy header to make sure you do not leak user information.',
  description:
    'Referrer Policy is a new header that allows a site to control how much information the browser includes with navigations away from a document and should be set by all sites. https://scotthelme.co.uk/a-new-security-header-referrer-policy/.',
  weight: 6,
  tags: ['headers', 'privacy'],
  processPage: function(page) {
    const offending = [];
    let score = 0;
    let advice = '';
    const finalUrl = page.finalUrl;
    page.assets.forEach(function(asset) {
      if (asset.url === finalUrl) {
        if (asset.headers.response['referrer-policy']) {
          score = 100;
        } else {
          offending.push(asset.url);
        }
      }
    });
    if (score === 0) {
      advice =
        'Set a referrer-policy header to make sure you do not leak user information.';
    }
    return {
      score: score,
      offending: offending,
      advice: advice
    };
  }
};
