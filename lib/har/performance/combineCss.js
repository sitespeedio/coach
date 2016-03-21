'use strict';
let util = require('../util');

module.exports = {
  id: 'combineCss',
  title: 'Combine CSS files if HTTP/1',
  description: 'The more number of CSS requests, the slower the page will be. Combine your css files into one.',
  weight: 5,
  tags: ['performance', 'css', 'HTTP/1'],
  processPage: function(page) {

    // Using HTTP/2 "should"
    if (util.isHTTP2(page)) {
      return {score: 100, offending: [], advice: 'Using a HTTP/2 or SPDY connection should not be hurt by serving many CSS from the same domain ...  but be careful! Many CSS requests on a page can still make the load slow, so check how they are prioritized. It could be that you should combine at least a few of them.'};
    }

    // FIXME should consider domain when suggesting assets to combine.
    // Not sure about this FIXME? Thinking you could serve everything from the same domain even though you have third parties etc.
    const urls = page.assets.filter((asset) => asset.type === 'css').map((asset) => asset.url);
    let score = urls.length > 1 ? 100 - (urls.length * 10) < 0 ? 0 : 100 - (urls.length * 10) : 100;

    return {
      score: score,
      offending: urls,
      advice: score < 100 ? 'The page has ' + urls.length + ' CSS requests. You could and should try to combine them.' : ''
    };
  }
};
