'use strict';

module.exports = {
  id: 'mixedContent',
  title: 'Serve all responses on HTTPS (when you are on HTTPS)',
  description:
    'You need to make sure that if you are on HTTPS, all responses are on HTTPS so that the content served are secured.',
  weight: 7,
  tags: ['privacy'],
  processPage: function(page) {
    const offending = [];
    let score = 100;
    let advice = '';
    const finalUrl = page.finalUrl;
    if (finalUrl.indexOf('https://') > -1) {
      page.assets.forEach(function(asset) {
        if (asset.url.indexOf('http://') > -1) {
          score = 0;
          offending.push(asset.url);
        }
      });
    }
    if (score === 0) {
      advice =
        'You need to serve all responses on HTTPS. The page have ' +
        offending.length +
        ' responses on HTTP. That is a privacy and security risk';
    }
    return {
      score: score,
      offending: offending,
      advice: advice
    };
  }
};
