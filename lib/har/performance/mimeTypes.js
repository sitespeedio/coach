'use strict';
module.exports = {
  id: 'mimeTypes',
  title: 'Avoid using incorrect mime types',
  description:
    "It's not a great idea to let browsers guess content types (content sniffing), in some cases it can actually be a security risk.",
  weight: 0,
  tags: ['performance', 'bestpractice'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      if (asset.type == 'other' && (asset.status > 199 && asset.status < 300)) {
        score--;
        offending.push(asset.url);
      }
    });
    return {
      score: Math.max(0, score),
      offending: offending,
      advice:
        score < 100
          ? 'The page has ' + offending.length + ' misconfigured mime type(s). '
          : ''
    };
  }
};
