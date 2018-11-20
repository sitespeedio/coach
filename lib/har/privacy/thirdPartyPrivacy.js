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
    const firstPartyRequests = page.firstParty.requests;
    const thirdPartyRequests = page.thirdParty.requests;
    const thirdPartyTransferSizeBytes = page.thirdParty.transferSize;
    const thirdPartySize = util.formatBytes(thirdPartyTransferSizeBytes);

    const thirdPartyPercent =
      thirdPartyRequests > 0
        ? (thirdPartyRequests / (firstPartyRequests + thirdPartyRequests)) * 100
        : 0;

    const score = 100 - Math.round(thirdPartyPercent);
    let advice =
      'You have ' +
      Math.round(thirdPartyPercent) +
      '% of the request that is 3rd party (' +
      thirdPartyRequests +
      ' requests with a size of ' +
      thirdPartySize +
      '). ';

    if (advice !== '') {
      advice +=
        'The regex ' +
        page.firstPartyRegEx +
        ' was used to calculate first/third party requests. You can configure that with --firstParty. You should manually go through all the requests/responses and calculate the risk if the page share user information with the 3rd party.';
    }

    return {
      score: Math.max(0, score),
      offending: [],
      advice: advice
    };
  }
};
