'use strict';

const util = require('./util');
const packageInfo = require('../../package');

module.exports.runAdvice = function(pages, adviceList, domAdvice, options) {
  options = options || {};

  const allAdvice = adviceList.filter(validateAdvice);

  for (let page of pages) {
    const results = {};
    for (let advice of allAdvice) {
      const result = advice.processPage(page, domAdvice, options);
      results[result.id] = {
        id: advice.id,
        title: advice.title,
        description: advice.description,
        advice: result.advice,
        weight: advice.weight,
        tags: advice.tags,
        score: result.score,
        offending: result.offending
      };
    }

    return {
      advice: {
        performance: {
          adviceList: results
        },
        info: {
          pageTransferSize: util.formatBytes(page.transferSize),
          pageContentSize: util.formatBytes(page.contentSize),
          pageRequests: page.requests,
          pageDomains: page.totalDomains,
          pageContentTypes: page.contentTypes,
          pageExpireStats: util.human(
            page.expireStats,
            util.prettyPrintSeconds
          ),
          pageLastModifiedStats: util.human(
            page.lastModifiedStats,
            util.prettyPrintSeconds
          ),
          pageCookies: page.cookieStats
        }
      },
      version: packageInfo.version
    };
  }
};

function validateAdvice(advice) {
  if (!advice.id) {
    throw new Error('Advice is missing an id: ', JSON.stringify(advice));
  }
  if (!(typeof advice.processPage === 'function')) {
    throw new Error('Advice ' + advice.id + ' needs a processPage function.');
  }
  return true;
}
