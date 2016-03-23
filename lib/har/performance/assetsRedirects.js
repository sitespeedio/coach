'use strict';
let util = require('../util');

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
    let sameDominAsDocument = 0;
    page.assets.forEach(function(asset) {
      // skip the main document if that is redirected
      // it's caught the ine documenerRedirect advice
      if (page.url !== asset.url && isRedirect(asset)) {
          offending.push(asset.url);
          score -= 10;
          if (page.baseDomain === util.getHostname(asset.url)) {
            sameDominAsDocument++;
          }
        }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' redirect(s). ' +  (sameDominAsDocument > 0 ? sameDominAsDocument + ' of the redirects are from the base domain, please fix them! ' : '') + (offending.length > sameDominAsDocument ? (offending.length - sameDominAsDocument) + ' request(s) are from other domains, it could be 3rd party assets that do redirects that they really don\'t need :(' : ''): ''
    }
  }
};
