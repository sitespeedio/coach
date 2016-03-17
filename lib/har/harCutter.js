'use strict';
var groupBy = require('lodash.groupby');

module.exports.split = function(har, pageIndex) {

  if (har.log.pages[pageIndex] !== undefined) {
    let myHar =  Object.assign({}, har);

    // get the id
    let pageId = myHar.log.pages[pageIndex].id;

    let resourcesByPage = groupBy(myHar.log.entries, 'pageref');
    myHar.log.entries = resourcesByPage[pageId];

    myHar.log.pages = [myHar.log.pages[pageIndex]];
    return myHar;
  }
  else {
    throw "PageIndex out of range";
  }
};
