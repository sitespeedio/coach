/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
 (function(util) {
  'use strict';
  var score = 0;
  var offending = [];

  var styles = util.getCSSFiles(document.head);
  var docDomain = document.domain;

  var preconnects = util.getResourceHintsHrefs('preconnect');
  var preconnectDomains = preconnects.map(function(preconnect) {
    return util.getHostname(preconnect);
  });
  var domains = [];

  // TODO add H2 info

  styles.forEach(function(style) {
    var styleDomain = util.getHostname(style);
    if (styleDomain !== docDomain) {
      offending.push(style);
      // do we already have it in our domain list, then don't hurt the score
      // TODO hurt ever X amount or something
      if (!util.exists(styleDomain, domains)) {
        // if we preconnect to that URL maybe it can be a little better(?) lets
        // hurt it less.
        score += util.exists(styleDomain, preconnectDomains) ? 5:10;
        domains.push(styleDomain);
      }
    }
  });

  return {
    id: 'cssInHeadDomain',
    title: 'Load CSS in head from document domain',
    description: 'Make sure css in head is loaded from same domain as document, in order to have a better user experience and minimize DNS lookups.',
    advice: offending.length > 0 ? 'The page got ' + offending.length + ' CSS files requested from another domain than the main document.' : '',
    score: Math.max(0, 100 - score),
    weight: 2,
    offending: offending,
    tags: ['performance', 'css']
  };
})(util);
