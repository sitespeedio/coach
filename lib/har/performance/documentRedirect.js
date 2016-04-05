'use strict';

module.exports = {
  id: 'documentRedirect',
  title: 'Avoid redirecting the main document',
  description: 'You should never ever redirect the main document. Well only if the user uses HTTP and there\'s a HTTPS version of the page.',
  weight: 9,
  tags: ['performance'],
  processPage: function(page) {
    let score = page.documentRedirects > 0 ? 0 : 100;
    let advice = page.documentRedirects > 0 ? 'The main document gets redirected ' + page.documentRedirects + ' time(s). Remove those redirect and make the page faster!' : '';
    // if a HTTP redirects to HTTPS don't hurt that because that is
    // really nice :)
    if (page.documentRedirects === 1 && page.url !== page.finalUrl) {
       // do we redirect to a HTTP page?
       if (page.url.indexOf('http:')> -1 && page.finalUrl.indexOf('https') > -1) {
         advice = 'The page redirect from HTTP to HTTPS, that\s good!';
         score = 100;
       }
    }

    return {
      score: score,
      offending: [],
      advice : advice
    };
  }
};
