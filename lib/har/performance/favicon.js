'use strict';

module.exports = {
  id: 'favicon',
  title: 'The favicon should be small and cacheable',
  description:
    "It is easy to make the favicon big but please avoid doing that, because every browser will then perform an unnecessarily large download. And make sure the cache headers are set for a long time for the favicon. It is easy to miss since it's another content type.",
  weight: 1,
  tags: ['performance', 'favicon'],

  processPage: function(page) {
    let total = 0;
    let offending = [];
    let advice = '';
    page.assets.forEach(function(asset) {
      if (asset.type === 'favicon') {
        if (asset.status >= 299) {
          total += 100;
          advice += 'The favicon returned ' + asset.status + '. ';
        }
        if (asset.transferSize > 5000) {
          total += 50;
          advice +=
            'The favicon size is ' +
            asset.transferSize +
            " bytes. That's quite big, can you make it smaller? ";
        }
        if (asset.expires <= 0) {
          total += 50;
          advice += 'The favicon has no cache time. ';
        }
        if (total > 0) {
          offending.push(asset.url);
        }
      }
    });

    // If we miss out of the favicon ... well do not report it for now
    // it seems to be a bug in how we create the HAR in Chrome (or in PageXray)

    return {
      score: Math.max(0, 100 - total),
      offending: offending,
      advice: advice
    };
  }
};
