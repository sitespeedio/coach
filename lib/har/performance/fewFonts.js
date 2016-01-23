'use strict';

module.exports = {
  id: 'fewFonts',
  title: 'Avoid too many fonts',
  description: 'Fonts can slow down the rendering of content try to avoid too many of them',
  weight: 2,
  tags: ['performance', 'font'],
  processPage: function(page) {

    const urls = page.assets.filter((asset) => asset.type === 'font').map((asset) => asset.url);

    // only hurt if we got more than one font
    let score = (urls.length > 1) ? (100 - (urls.length * 10) < 0 ? 0 : 100 - (urls.length * 10)) : 100 ;

    return {
      score: score,
      offending: urls,
      advice: score < 100 ? 'The page got ' + urls.length + ' font requests. Do you really really need them? What extra do the fonts do for the user?' : ''
    };
  }
};
