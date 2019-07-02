'use strict';

const util = require('./util');
const packageInfo = require('../../package');
const thirdParty = require('./thirdParty');

module.exports.runAdvice = function(
  pages,
  harAdvicesByCategory,
  domAdvice,
  options
) {
  options = options || {};
  const all = [];
  const results = {};
  for (let page of pages) {
    for (let category of Object.keys(harAdvicesByCategory)) {
      const adviceList = harAdvicesByCategory[category];
      const allAdvice = adviceList.filter(validateAdvice);
      results[category] = {
        adviceList: {}
      };
      for (let advice of allAdvice) {
        const result = advice.processPage(page, domAdvice, options);
        results[category].adviceList[advice.id] = {
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
    }
    const thirdParties = thirdParty.getThirdParty(page);
    const withoutCategories = {
      advice: {
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
          pageCookies: page.cookieStats,
          thirdParty: {
            requestsByCategory: thirdParties.byCategory,
            requestsByTool: thirdParties.toolsByCategory
          }
        }
      },
      version: packageInfo.version
    };
    for (let category of Object.keys(results)) {
      withoutCategories.advice[category] = results[category];
    }
    all.push(withoutCategories);
  }
  return all;
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
