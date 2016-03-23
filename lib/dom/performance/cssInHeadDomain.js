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
        score += util.exists(styleDomain, preconnectDomains) ? 5 : 10;
        domains.push(styleDomain);
      }
    }
  });

  return {
    id: 'cssInHeadDomain',
    title: 'Load CSS in head from document domain',
    description: 'Make sure CSS in the head is loaded from same domain as document, in order to have a better user experience and minimize DNS lookups.',
    advice: offending.length > 0 ? 'The page has ' + offending.length + ' CSS files requested from another domain than the main document. Move them to the main domain so that the browser don\'t need to do a extra DNS lookup.' : '',
    score: Math.max(0, 100 - score),
    weight: 2,
    offending: offending,
    tags: ['performance', 'css']
  };
})(util);
