'use strict';

let util = require('../util');

module.exports = {
  id: 'imageSize',
  title: "Total image size shouldn't be too big",
  description:
    'Avoid having too many large images on the page. The images will not affect the first paint of the page, but it will eat bandwidth for the user.',
  weight: 5,
  tags: ['performance', 'image'],

  processPage: function(page) {
    let images = page.assets.filter(
      asset => asset.type === 'image' || asset.type === 'svg'
    );
    let contentSize = 0;
    let contentLimit = 700000;
    let score = 100;

    images.forEach(function(image) {
      contentSize += image.contentSize;
    });

    if (contentSize > contentLimit) {
      // TODO reduce the score per 100 kB.
      score -= 50;
    }

    return {
      score: score,
      offending: [],
      advice:
        score < 100
          ? 'The page total image size is ' +
            util.formatBytes(contentSize) +
            ". It's really big. Is the page using the right format for the images? Are they compressed as good as they can be? Make them smaller by using https://imageoptim.com/."
          : ''
    };
  }
};
