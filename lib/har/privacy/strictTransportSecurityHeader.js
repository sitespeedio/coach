'use strict';

module.exports = {
  id: 'strictTransportSecurityHeader',
  title:
    'Set a strict transport header to make sure the user always use HTTPS.',
  description:
    'The HTTP Strict-Transport-Security response header (often abbreviated as HSTS) lets a web site tell browsers that it should only be accessed using HTTPS, instead of using HTTP. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security.',
  weight: 6,
  tags: ['headers', 'privacy'],
  processPage: function(page) {
    const offending = [];
    let score = 100;
    let advice = '';
    const finalUrl = page.finalUrl;
    if (finalUrl.indexOf('https://') > -1) {
      score;
      page.assets.forEach(function(asset) {
        if (asset.url === finalUrl) {
          if (asset.headers.response['strict-transport-security']) {
            score = 100;
            const h = asset.headers.response['strict-transport-security'];
            if (h.indexOf('includeSubDomains') === -1) {
              score = 90;
              advice =
                'A strict transport header is set but miss out on setting includeSubDomains';
            }
            if (h.indexOf('max-age=') === -1) {
              score = 0;
              advice =
                'A strict transport header is set but but no max-age! The header is not set correct.';
            } else {
              const parts = h.split(';');
              if (parts[0].startsWith('max-age=')) {
                const time = parts[0].substring(
                  parts[0].indexOf('=') + 1,
                  parts[0].length
                );
                const minSixMonth = 15768000;
                if (time < minSixMonth) {
                  score -= 20;
                  advice +=
                    'The max age is lower than six months. Increase it to get a better score.';
                }
              }
            }
          } else {
            offending.push(asset.url);
          }
        }
      });
    }
    if (score === undefined) {
      advice =
        'Set a strict transport header to make sure the user always use HTTPS.';
      score = 0;
    }
    return {
      score: score,
      offending: offending,
      advice: advice
    };
  }
};
