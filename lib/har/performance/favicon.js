'use strict';

function processAsset (asset) {
    if (asset.type !== 'favicon')
      return -1;

    let score = 0;
    if (asset.status >= 299) {
      score = 50;
    }

    if (asset.size > 2000) {
      score += 10;
    }
    if (asset.expires <= 0) {
      score += 10;
    }

    return score;
  }

module.exports = {
  id: 'favicon',
  title: 'The favicon should be small and cacheable',
  description: '',
  weight: 1,
  tags: ['performance', 'favicon'],

  processPage: function(page, domAdvice, options) {
    let score = 100;
    let offending = [];
    let doWeHaveAFavicon = false;
    let advice = '';
    page.assets.forEach(function(asset) {
      let myScore = processAsset(asset);
      if (myScore > 0) {
        score -= myScore;
        offending.push(asset.url);
        doWeHaveAFavicon = true;
      } else if (myScore === 0) {
        doWeHaveAFavicon = true;
      }
    });

    // The Favicon check doesn't work in Chrome because of
    // https://github.com/sitespeedio/coach/issues/49
    if (!doWeHaveAFavicon && options.browser === 'chrome') {
      score = 0;
      advice = 'The page is missing a favicon.';
    } else if (score < 100) {
    // TODO add the reason why we report error on the favicon
     advice = 'The favicon should be small and cacheable.';
    }
  
    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    }
  }
};
