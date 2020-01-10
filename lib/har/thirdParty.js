'use strict';

const { getEntity } = require('third-party-web');

module.exports.getThirdParty = function(page) {
  const toolsByCategory = {};
  const offending = [];
  const byCategory = {};
  let thirdPartyTransferSizeBytes = 0;
  const thirdPartyAssetsByCategory = {};
  const company =
    page && page.url.indexOf('localhost') > -1
      ? undefined
      : getEntity(page.url);
  let totalThirdPartyRequests = 0;
  for (let asset of page.assets) {
    const entity =
      (asset && asset.url.indexOf('localhost') > -1) ||
      (asset && !asset.url.startsWith('http'))
        ? undefined
        : getEntity(asset.url);
    if (entity !== undefined) {
      if (company && company.name === entity.name) {
        // Testing comnpanies that themselves are a third party gives a high third party score
        // so we should remove the ones.
        continue;
      }
      totalThirdPartyRequests++;
      if (asset.transferSize) {
        thirdPartyTransferSizeBytes += asset.transferSize;
      }
      if (
        entity.name.indexOf('Google') > -1 ||
        entity.name.indexOf('Facebook') > -1 ||
        entity.name.indexOf('AMP') > -1 ||
        entity.name.indexOf('YouTube') > -1
      ) {
        if (!entity.categories.includes('survelliance')) {
          entity.categories.push('survelliance');
          offending.push(asset.url);
        }
      }
      for (let category of entity.categories) {
        if (!toolsByCategory[category]) {
          toolsByCategory[category] = {};
        }
        if (byCategory[category]) {
          byCategory[category] = byCategory[category] + 1;
          thirdPartyAssetsByCategory[category].push({
            url: asset.url,
            entity
          });
        } else {
          byCategory[category] = 1;
          thirdPartyAssetsByCategory[category] = [];
          thirdPartyAssetsByCategory[category].push({
            url: asset.url,
            entity
          });
        }
        if (toolsByCategory[category][entity.name]) {
          toolsByCategory[category][entity.name] += 1;
        } else {
          toolsByCategory[category][entity.name] = 1;
        }
      }
    }
  }
  return {
    thirdPartyTransferSizeBytes,
    totalThirdPartyRequests,
    toolsByCategory,
    byCategory,
    offending
  };
};
