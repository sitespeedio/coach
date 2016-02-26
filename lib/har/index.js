'use strict';

module.exports.runAdvice = function(pages, adviceList, options) {
  adviceList = adviceList.filter(validateAdvice);

  return pages.map((page) => {
    let results = adviceList.map((advice) => {
      let result = advice.processPage(page, options);
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
    });

    // setup a object with the ids as keys to make it easier to use
    let o = {};
    for (let i = 0; i < results.length; ++i) {
      o[results[i].id] = results[i];
    }

    return {
      performance: {adviceList : o}
    }
  })
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
