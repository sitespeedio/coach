'use strict';

module.exports = {
  id: 'lastModifiedTime',
  title: 'Avoid setting last modified header in the future',
  description: 'Dont\'t set last modified headers in the future!',
  weight: 0,
  tags: ['performance', 'bestpractice', 'server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      if (asset.timeSinceLastModified && parseInt(asset.timeSinceLastModified) < 0) {
        score -=10;
        offending.push(asset.url);
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? 'The page has ' + offending.length + ' request(s) that have lastModifiedTime greater than the current time. It is bad practice to set the modified time to a future date.' : ''
    }
  }
};
