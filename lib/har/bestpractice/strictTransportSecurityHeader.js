'use strict';

module.exports = {
  id: 'strictTransportSecurityHeader',
  title:
    'Set a strict transport header to make sure the user always use HTTPS.',
  description:
    'The HTTP Strict-Transport-Security response header (often abbreviated as HSTS) lets a web site tell browsers that it should only be accessed using HTTPS, instead of using HTTP. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
  weight: 6,
  tags: ['bestpractice', 'headers', 'privacy'],
  processPage: function(page) {
    const offending = [];
    let score = 0;
    let advice = '';
    const finalUrl = page.finalUrl;
    if (finalUrl.indexOf('https://') !== -1) {
      page.assets.forEach(function(asset) {
        if (asset.url === finalUrl) {
          if (asset.headers.response['strict-transport-security']) {
            score = 100;
          } else {
            offending.push(asset.url);
          }
        }
      });
    }
    if (score === 0) {
      advice =
        'Set a strict transport header to make sure the user always use HTTPS.';
    }
    return {
      score: score,
      offending: offending,
      advice: advice
    };
  }
};
