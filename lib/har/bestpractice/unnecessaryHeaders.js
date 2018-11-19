'use strict';

module.exports = {
  id: 'unnecessaryHeaders',
  title: 'Avoid Unnecessary Headers',
  description:
    "Do not send headers that you don't need. We look for p3p, cache-control and max-age, pragma, server and x-frame-options headers. Have a look at Andrew Betts - Headers for Hackers talk as a guide https://www.youtube.com/watch?v=k92ZbrY815c or read https://www.fastly.com/blog/headers-we-dont-want.",
  weight: 1,
  tags: ['bestpractice', 'header'],
  processPage: function(page) {
    const offending = [];
    const p3pHeaders = [];
    const cacheHeaders = [];
    const pragmaHeaders = [];
    const xframeHeaders = [];
    const serverHeaders = [];
    let score = 100;
    let advice = '';
    page.assets.forEach(function(asset) {
      if (asset.headers.response.p3p) {
        offending.push(asset.url);
        p3pHeaders.push(asset.url);
        score -= 1;
      }

      if (
        asset.headers.response.expires &&
        asset.headers.response['cache-control'] &&
        asset.headers.response['cache-control'].indexOf('max-age' > -1)
      ) {
        // You don't need to set both expires and cache-control: max-age. Use just one!
        offending.push(asset.url);
        cacheHeaders.push(asset.url);
        score -= 1;
      }

      if (
        asset.headers.response.pragma &&
        asset.headers.response.pragma.indexOf('no-cache') > -1
      ) {
        offending.push(asset.url);
        pragmaHeaders.push(asset.url);
        score -= 1;
      }

      if (asset.headers.response.server) {
        offending.push(asset.url);
        serverHeaders.push(asset.url);
        score -= 1;
      }

      if (
        asset.headers.response['x-frame-options'] &&
        asset.headers.response['x-frame-options'] === 'sameorigin'
      ) {
        offending.push(asset.url);
        xframeHeaders.push(asset.url);
        score -= 1;
      }
    });

    if (p3pHeaders.length > 0) {
      advice +=
        'There are ' +
        p3pHeaders.length +
        ' response(s) that sets a p3p header. ';
    }
    if (cacheHeaders.length > 0) {
      advice +=
        'There are ' +
        cacheHeaders.length +
        ' response(s) that sets both a max-age and expires header. ';
    }
    if (pragmaHeaders.length > 0) {
      advice +=
        'There are ' +
        pragmaHeaders.length +
        ' response(s) that sets a pragma no-cache header (that is a request header). ';
    }
    if (xframeHeaders.length > 0) {
      advice +=
        'There are ' +
        xframeHeaders.length +
        ' response(s) that sets a x-frame-options:sameorigin header. ';
    }
    if (serverHeaders.length > 0) {
      advice +=
        'There are ' +
        serverHeaders.length +
        ' response(s) that sets a server header. ';
    }

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    };
  }
};
