'use strict';

var redirect = [301, 302, 303, 305, 306, 307];

function isRedirect(asset) {
  return redirect.indexOf(asset.status) > -1;
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
      // skip the main document if that is redirected
      // it's caught the ine documenerRedirect advice
      if (page.url !== asset.url) {
        if (isRedirect(page, asset)) {
          offending.push(asset.url);
          score -= 10;
        }
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' redirects. This could be caused by 3rd party assets that do redirects that they really don\'t need :(' : ''
    }
  }
};
