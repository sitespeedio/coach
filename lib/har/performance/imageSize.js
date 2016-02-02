'use strict';

module.exports = {
  id: 'imageSize',
  title: 'Total image size shouldn\'t be too big',
  description: '',
  weight: 5,
  tags: ['performance', 'image'],

  processPage: function(page) {

    let images = page.assets.filter((asset) => asset.type === 'image');
    let contentSize = 0;
    let contentLimit = 700000;
    let score = 100;

    images.forEach(function(image) {
      contentSize += image.contentSize;
    });

    if (contentSize > contentLimit) {
      // TODO reduce the score per 100 kb.
      score -= 50;
    }

    return {
      score: score,
      offending: [],
      advice: score < 100 ? 'The total image size is ' + contentSize + '. That is really big and you should check what you can do to make it smaller' : ''
    };
  }

};
