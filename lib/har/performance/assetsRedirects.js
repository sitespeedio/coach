'use strict';

let util = require('../util');

var redirect = [301, 302, 303, 305, 306, 307];

function isRedirect(asset) {
  return redirect.indexOf(asset.status) > -1;
}

module.exports = {
  id: 'assetsRedirects',
  title: 'Avoid doing redirects',
  description:
    'A redirect is one extra step for the user to download the asset. Avoid that if you want to be fast. Redirects are even more of a showstopper on mobile.',
  weight: 2,
  tags: ['performance'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    let sameDomainAsDocument = 0;
    page.assets.forEach(function(asset) {
      // skip the main document if that is redirected
      // it's caught the ine documentRedirect advice
      if (page.url !== asset.url && isRedirect(asset)) {
        offending.push(asset.url);
        score -= 10;
        if (page.baseDomain === util.getHostname(asset.url)) {
          sameDomainAsDocument++;
        }
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice:
        score < 100
          ? 'The page has ' +
            offending.length +
            ' redirect(s). ' +
            (sameDomainAsDocument > 0
              ? sameDomainAsDocument +
                ' of the redirects are from the base domain, please fix them! '
              : '') +
            (offending.length > sameDomainAsDocument
              ? offending.length -
                sameDomainAsDocument +
                ' request(s) are from other domains, it could be 3rd-party assets doing unnecessary redirects. :('
              : '')
          : ''
    };
  }
};
