'use strict';

module.exports = {
  id: 'unnecessaryHeaders',
  title: 'Avoid Unnecessary Headers',
  description:
    "Do not send headers that you don't need. We look for p3p, cache-control and max-age, pragma and x-frame-options headers. Have a look at Andrew Betts - Headers for Hackers talk as a guide https://www.youtube.com/watch?v=k92ZbrY815c",
  weight: 1,
  tags: ['bestpractice', 'header'],
  processPage: function(page) {
    const offending = [];
    let score = 100;
    let advice = '';
    page.assets.forEach(function(asset) {
      if (asset.headers.response.p3p) {
        offending.push(asset.url);
        score -= 1;
        advice +=
          asset.url +
          ' has a obsolete p3p header:' +
          asset.headers.response.p3p +
          '. https://en.wikipedia.org/wiki/P3P. ';
      } else if (
        asset.headers.response.expires &&
        asset.headers.response['cache-control'] &&
        asset.headers.response['cache-control'].indexOf('max-age' > -1)
      ) {
        // You don't need to set both expires and cache-control: max-age. Use just one!
        offending.push(asset.url);
        score -= 1;
        advice +=
          asset.url +
          ' has both an expires and a cache-control:max-age header. ';
      } else if (
        asset.headers.response.pragma &&
        asset.headers.response.pragma.indexOf('no-cache') > -1
      ) {
        offending.push(asset.url);
        score -= 1;
        advice += asset.url + ' has pragma: no-cache response header. ';
      } else if (
        asset.headers.response['x-frame-options'] &&
        asset.headers.response['x-frame-options'] === 'sameorigin'
      ) {
        offending.push(asset.url);
        score -= 1;
        advice +=
          asset.url +
          ' use a x-frame-options: sameorigin header, you should instead use a Content-Security-Policy header. ';
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    };
  }
};
