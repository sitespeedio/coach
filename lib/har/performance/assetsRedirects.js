'use strict';

function isRedirect(asset) {
  return asset.status === 301 || asset.status === 307;
}

module.exports = {
  id: 'assetsRedirects',
  title: 'Avoid doing redirects',
  description: 'Avoid doing redirects, it will kill your web page on mobile.',
  weight: 2,
  tags: ['performance'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      if (isRedirect(asset)) {
        offending.push(asset.url);
        score -= 10;
      }
    });

    return {
      score: score < 0 ? 0 : score,
      offending: offending,
      advice: score < 100 ? 'You got ' + offending.length + ' redirects on your page. Could be some 3rd party assets that do some redirects that they really don\'t need :(' : ''
    }
  }
};
