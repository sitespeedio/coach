'use strict';

const Promise = require('bluebird'),
packageInfo = require('../../package');

module.exports.runAdvice = function(pages, adviceList, domAdvice, options) {
  const allAdvice = Promise.resolve(adviceList)
    .filter(validateAdvice);

  return Promise.resolve(pages)
    .map((page) =>
      allAdvice
      .map((advice) => {
        let result = advice.processPage(page, domAdvice, options);
        return {
          id: advice.id,
          title: advice.title,
          description: advice.description,
          advice: result.advice,
          weight: advice.weight,
          tags: advice.tags,
          score: result.score,
          offending: result.offending
        };
      })
      .reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {})
      .then((results) => {
        return {
          coachAdvice: {
            results: {
              performance: {
                adviceList: results
              }
            },
            version: packageInfo.version
          }
        }
      }));
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
