'use strict';

module.exports = {
  id: 'favicon',
  title: 'The favicon should be small and cacheable',
  description: '',
  weight: 1,
  tags: ['performance', 'favicon'],

  processPage: function(page, domAdvice, options) {
    let total = 0;
    let offending = [];
    let doWeHaveAFavicon = false;
    let advice = '';
    page.assets.forEach(function(asset) {
      if (asset.type === 'favicon') {
        if (asset.status >= 299) {
          total += 100;
          advice += 'The favicon returned ' + asset.status + '. ';
        }
        if (asset.size > 2000) {
            total += 50;
            advice += 'The favicon size is ' + asset.size + ' bytes. That\'s quite big, can you make it smaller? ';
        }
        if (asset.expires <= 0) {
            total += 50;
            advice += 'The favicon has no cache time. ';
        }
        if (total > 0) {
            offending.push(asset.url);
        }
        doWeHaveAFavicon = true;
      }
    });

    // The Favicon check doesn't work in Chrome because of
    // https://github.com/sitespeedio/coach/issues/49
    if (!doWeHaveAFavicon && options.browser === 'chrome') {
      total = 100;
      advice = 'The page is missing a favicon.';
    }

    return {
      score: Math.max(0, 100 - total),
      offending: offending,
      advice: advice
    }
  }
};
