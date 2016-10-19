'use strict';

var groupBy = require('lodash.groupby'),
    cloneDeep = require('lodash.clonedeep');

module.exports.pickAPage = function(har, pageIndex) {

  if (typeof har.log.pages[pageIndex] !== 'undefined') {
    let myHar = cloneDeep(har);

    // get the ID
    let pageId = myHar.log.pages[pageIndex].id;

    let resourcesByPage = groupBy(myHar.log.entries, 'pageref');
    myHar.log.entries = resourcesByPage[pageId];

    myHar.log.pages = [myHar.log.pages[pageIndex]];
    return myHar;
  } else {
    throw new Error('PageIndex out of range');
  }
};
