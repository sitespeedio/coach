'use strict';

let util = require('../util');

module.exports = {
  id: 'pageSize',
  title: "Total page size shouldn't be too big",
  description:
    'Avoid having pages that have a transfer size over the wire of more than 2 MB (desktop) and 1 MB (mobile) because that is really big and will hurt performance and will make the page expensive for the user if she/he pays for the bandwidth.',
  weight: 3,
  tags: ['performance', 'mobile'],
  processPage: function(page, domAdvice, options) {
    let sizeLimit = options.mobile ? 1000000 : 2000000;
    if (page.transferSize > sizeLimit) {
      return {
        score: 0,
        offending: [],
        advice:
          'The page total transfer size is ' +
          util.formatBytes(page.transferSize) +
          ', which is more than the coach limit of ' +
          util.formatBytes(sizeLimit) +
          '. That is ' +
          (page.transferSize > 5000000 ? 'insane' : 'really big') +
          ' and you need to make it smaller.'
      };
    }
    return {
      score: 100,
      offending: [],
      advice: ''
    };
  }
};
