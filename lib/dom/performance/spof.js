(function(util) {
  'use strict';
  var score = 0;
  var offending = [];
  var offendingDomains = [];

  // simplify and only look for css & js spof
  var docDomain = document.domain;

  // do we have any CSS loaded inside of head from a different domain?
  var styles = util.getCSSFiles(document.head);
  styles.forEach(function(style) {
    var styleDomain = util.getHostname(style);
    if (styleDomain !== docDomain) {
      offending.push(style);
      if (offendingDomains.indexOf(styleDomain) === -1) {
        offendingDomains.push(styleDomain);
        score += 10;
      }
    }
  });

  // do we have any JS loaded inside of head from a different domain?
  var scripts = util.getSynchJSFiles(document.head);
  scripts.forEach(function(script) {
    var scriptDomain = util.getHostname(script);
    if (scriptDomain !== docDomain) {
      offending.push(script);
      if (offendingDomains.indexOf(scriptDomain) === -1) {
        offendingDomains.push(scriptDomain);
        score += 10;
      }
    }
  });

  return {
    id: 'spof',
    title: 'Avoid Frontend single point of failure',
    description: 'A page should not have a single point of failure a.k.a load content from a provider that can cause the page to stop working.',
    advice: offending.length > 0 ? 'The page has ' + offending.length + ' requests inside of head that can cause a SPOF. Load them async or move them outside of head.' : '',
    score: Math.max(0, 100 - score),
    weight: 7,
    offending: offending,
    tags: ['performance', 'css', 'js']
  };
})(util);
