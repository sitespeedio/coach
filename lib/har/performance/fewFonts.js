'use strict';

module.exports = {
  id: 'fewFonts',
  title: 'Avoid too many fonts',
  description:
    'How many fonts do you need on a page for the user to get the message? Fonts can slow down the rendering of content, try to avoid loading too many of them because worst case it can make the text invisible until they are loaded (FOIT—flash of invisible text), best case they will flicker the text content when they arrive.',
  weight: 2,
  tags: ['performance', 'font'],
  processPage: function(page) {
    const urls = page.assets
      .filter(asset => asset.type === 'font')
      .map(asset => asset.url);

    // only hurt if we got more than one font
    let score =
      urls.length > 1
        ? 100 - urls.length * 10 < 0
          ? 0
          : 100 - urls.length * 10
        : 100;

    return {
      score: score,
      offending: urls,
      advice:
        score < 100
          ? 'The page has ' +
            urls.length +
            ' font requests. Do you really need them? What value does the fonts give the user?'
          : ''
    };
  }
};
