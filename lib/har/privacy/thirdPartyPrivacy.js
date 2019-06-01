'use strict';

let util = require('../util');

module.exports = {
  id: 'thirdPartyPrivacy',
  title: 'Do not share user data with third parties',
  description:
    'Using third party requests shares user information with that third party. Avoid that.',
  weight: 5,
  tags: ['privacy'],
  processPage: function(page) {
    const firstPartyRequests = page.firstParty.requests || 0;
    const thirdPartyRequests = page.thirdParty.requests || 0;
    const thirdPartyTransferSizeBytes = page.thirdParty.transferSize || 0;
    const thirdPartySize = util.formatBytes(thirdPartyTransferSizeBytes);

    const thirdPartyPercent =
      thirdPartyRequests > 0
        ? (thirdPartyRequests / (firstPartyRequests + thirdPartyRequests)) * 100
        : 0;

    const score = 100 - Math.round(thirdPartyPercent);
    let advice = '';
    if (thirdPartyPercent === 100) {
      advice =
        'You have 100% of third party requests! You need to tune your first party regex.';
    } else {
      advice =
        'You have ' +
        Math.round(thirdPartyPercent) +
        '% of the request that is 3rd party (' +
        thirdPartyRequests +
        ' requests with a size of ' +
        thirdPartySize +
        '). ';
    }
    advice +=
      'The regex ' +
      page.firstPartyRegEx +
      ' was used to calculate first/third party requests. You can configure that with --firstParty. You should manually go through all the requests/responses and calculate the risk if the page share user information with the 3rd party.';

    return {
      score: Math.max(0, score),
      offending: [],
      advice: advice
    };
  }
};
