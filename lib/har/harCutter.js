'use strict';

var groupBy = require('lodash.groupby');

module.exports.pickAPage = function(har, pageIndex) {
  if (typeof har.log.pages[pageIndex] !== 'undefined') {
    const myHar = JSON.parse(JSON.stringify(har));

    // get the ID
    const pageId = myHar.log.pages[pageIndex].id;

    const resourcesByPage = groupBy(myHar.log.entries, 'pageref');
    myHar.log.entries = resourcesByPage[pageId];

    myHar.log.pages = [myHar.log.pages[pageIndex]];
    return myHar;
  } else {
    throw new Error('PageIndex out of range');
  }
};
