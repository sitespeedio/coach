'use strict';

let util = require('../util');

module.exports = {
  id: 'thirdParty',
  title: 'Avoid use too many third party responses',
  description: 'Do not load most of your content from third party URLs.',
  weight: 7,
  tags: ['bestpractice'],
  processPage: function(page) {
    let score = 100;
    let advice = '';
    const firstPartyRequests = page.firstParty.requests;
    const thirdPartyRequests = page.thirdParty.requests;
    const firstPartyTransferSizeBytes = page.firstParty.transferSize;
    const thirdPartyTransferSizeBytes = page.thirdParty.transferSize;
    const firstPartySize = util.formatBytes(firstPartyTransferSizeBytes);
    const thirdPartySize = util.formatBytes(thirdPartyTransferSizeBytes);

    const thirdPartyPercent =
      thirdPartyRequests > 0
        ? (thirdPartyRequests / (firstPartyRequests + thirdPartyRequests)) * 100
        : 0;

    if (thirdPartyRequests > firstPartyRequests) {
      score -= 50;
      advice =
        'The page do more requests to third party domains (' +
        thirdPartyRequests +
        ' requests and ' +
        thirdPartySize +
        ') then first party (' +
        firstPartyRequests +
        ' requests and ' +
        firstPartySize +
        '). ';
    } else if (thirdPartyPercent > 10) {
      score -= 50;
      advice =
        'The page do ' +
        Math.round(thirdPartyPercent) +
        '% requests to third party domains (' +
        thirdPartyRequests +
        ' requests and ' +
        thirdPartySize +
        '). First party is ' +
        firstPartyRequests +
        ' requests and ' +
        firstPartySize +
        '. ';
    }

    if (thirdPartyTransferSizeBytes > firstPartyTransferSizeBytes) {
      score -= 50;
      advice +=
        'The page transfer more bytes from third party domains (' +
        thirdPartySize +
        ') then first party (' +
        firstPartySize +
        '). ';
    }

    if (advice !== '') {
      advice +=
        'The regex ' +
        page.firstPartyRegEx +
        ' was used to calculate first/third party requests.';
    }

    return {
      score: Math.max(0, score),
      offending: [],
      advice: advice
    };
  }
};
