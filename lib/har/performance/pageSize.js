'use strict';
let util = require('../util');

module.exports = {
  id: 'pageSize',
  title: 'Total page size shouldn\'t be too big',
  description: 'Avoid having pages that have transfer size over the wire of more than 2 MB because that is really big and will hurt performance. ',
  weight: 3,
  tags: ['performance','server','mobile'],
  processPage: function(page) {
    if (page.transferSize > 2000000) {
      return {score: 0, offending: [], advice:'The page total transfer size is ' + util.formatBytes(page.transferSize) + ', which is more that 2 MB. That is really big and you should check what you can do to make it smaller'};
    }
    return {score: 100, offending: [], advice:''};
  }
};
