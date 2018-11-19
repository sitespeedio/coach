'use strict';

module.exports = {
  id: 'contentSecurityPolicyHeader',
  title:
    'Use a good Content-Security-Policy header to make sure you you avoid Cross Site Scripting (XSS) attacks.',
  description:
    'Content Security Policy is delivered via a HTTP response header, and defines approved sources of content that the browser may load. It can be an effective countermeasure to Cross Site Scripting (XSS) attacks and is also widely supported and usually easily deployed. https://scotthelme.co.uk/content-security-policy-an-introduction/.',
  weight: 5,
  tags: ['bestpractice', 'headers', 'privacy'],
  processPage: function(page) {
    const offending = [];
    let score = 0;
    let advice = '';
    const finalUrl = page.finalUrl;
    page.assets.forEach(function(asset) {
      if (asset.url === finalUrl) {
        if (asset.headers.response['content-security-policy']) {
          const maxLength = 100;
          if (
            asset.headers.response['content-security-policy'].length > maxLength
          ) {
            score = 50;
            advice =
              'The site uses a Content-Security-Policy header, good! But it is long, can you try to make it stricter so you allow more security for the user?';
          } else {
            score = 100;
          }
        } else {
          offending.push(asset.url);
        }
      }
    });
    if (score === 0) {
      advice =
        'Set a Content-Security-Policy header to make sure you are not open for Cross Site Scripting (XSS) attacks.';
    }
    return {
      score: score,
      offending: offending,
      advice: advice
    };
  }
};
