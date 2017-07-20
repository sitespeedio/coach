'use strict';

let util = require('../util');

module.exports = {
  id: 'cssSize',
  title: "Total CSS size shouldn't be too big",
  description:
    "Delivering a massive amount of CSS to the browser is not the best thing you can do, because it means more work for the browser when parsing the CSS against the HTML and that makes the rendering slower. Try to send only the CSS that is used on that page. And make sure to remove CSS rules when they aren't used anymore.",
  weight: 5,
  tags: ['performance', 'css'],

  processPage: function(page, domAdvice, options) {
    let cssAssets = page.assets.filter(asset => asset.type === 'css');
    let transferSize = 0;
    let contentSize = 0;
    let transferLimit = 120000;
    let contentLimit = 400000;
    let score = 100;
    let advice = '';

    cssAssets.forEach(function(asset) {
      transferSize += asset.transferSize;
      contentSize += asset.contentSize;
    });

    if (transferSize > transferLimit) {
      score -= 50;
    }

    if (contentSize > contentLimit) {
      score -= 50;
    }

    if (score < 100) {
      advice =
        'The total CSS transfer size is ' +
        util.formatBytes(transferSize) +
        (contentSize > transferSize
          ? ' and uncompressed size is ' + util.formatBytes(contentSize)
          : '') +
        '. ';

      if (contentSize > 1000000 && options.mobile) {
        advice +=
          "Wow, it's insane amount of CSS to render a page on a mobile device.";
      } else if (contentSize > 2000000) {
        advice +=
          "I don't know what to say, the page needs more than 2 MB CSS to render.";
      } else {
        advice += 'That is big and the CSS could most probably be smaller.';
      }
    }

    return {
      score,
      offending: [],
      advice
    };
  }
};
