'use strict';

module.exports = {
  id: 'documentRedirect',
  title: 'Avoid redirecting the main document',
  description:
    "You should never ever redirect the main document, because it will make the page load slower for the user. Well, you should redirect the user if the user tries to use HTTP and there's an HTTPS version of the page. The coach checks for that. :)",
  weight: 9,
  tags: ['performance'],
  processPage: function(page) {
    let score = page.documentRedirects > 0 ? 0 : 100;
    let advice =
      page.documentRedirects > 0
        ? 'The main document gets redirected ' +
          page.documentRedirects +
          ' time(s). Remove those redirect and make the page faster!'
        : '';
    // if a HTTP redirects to HTTPS don't hurt that because that is
    // really nice :)
    if (page.documentRedirects === 1 && page.url !== page.finalUrl) {
      // do we redirect to an HTTP page?
      if (
        page.url.indexOf('http:') > -1 &&
        page.finalUrl.indexOf('https') > -1
      ) {
        advice = "The page redirects from HTTP to HTTPS, that's good!";
        score = 100;
      }
    }

    return {
      score: score,
      offending: page.redirectChain,
      advice: advice
    };
  }
};
