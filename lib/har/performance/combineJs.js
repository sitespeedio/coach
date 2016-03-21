'use strict';
let util = require('../util');

module.exports = {
  id: 'combineJs',
  title: 'Combine JS files if HTTP/1',
  description: 'The more number of Javascript requests, the slower the page will be if you are using HTTP/1. Combine your JS files into one.',
  weight: 5,
  tags: ['performance', 'js','HTTP/1'],
  processPage: function(page) {
    if (util.isHTTP2(page)) {
      return {score: 100, offending: [], advice: 'Using a HTTP/2 or SPDY connection should not be hurt by serving many Javascript from the same domain ... but be careful! Many Javascript request on the page can still make the page slow, so check how they are prioritized. It could be that you should combine at least a few of them.'};
    }
    // FIXME should consider domain when suggesting assets to combine.
    const urls = page.assets.filter((asset) => asset.type === 'javascript').map((asset) => asset.url);

    let score =  urls.length > 1 ? 100 - (urls.length * 10) < 0 ? 0 : 100 - (urls.length * 10) : 100;
    return {
      score: score,
      offending: urls,
      advice: score < 100 ? 'The page has ' + urls.length + ' Javascript requests. You could and should try to combine them.' : ''
    };
  }
};
