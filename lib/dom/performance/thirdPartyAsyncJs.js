(function(util) {
  'use strict';

  var patterns = [
    'ajax.googleapis.com',
    'apis.google.com',
    '.google-analytics.com',
    'connect.facebook.net',
    'platform.twitter.com',
    'code.jquery.com',
    'platform.linkedin.com',
    '.disqus.com',
    'assets.pinterest.com',
    'widgets.digg.com',
    '.addthis.com',
    'code.jquery.com',
    'ad.doubleclick.net',
    '.lognormal.com',
    'embed.spotify.com'
  ];

  function is3rdParty(url) {
    var hostname = util.getHostname(url);
    var re;
    for (var i = 0, len = patterns.length; i < len; i++) {
      re = new RegExp(patterns[i]);
      if (re.test(hostname)) {
        return true;
      }
    }
    return false;
  }

  var score = 0;
  var offending = [];
  var scripts = util.getSynchJSFiles(document);

  for (var i = 0, len = scripts.length; i < len; i++) {
    if (is3rdParty(scripts[i])) {
      offending.push(scripts[i]);
      score += 10;
    }
  }

  return {
    id: 'thirdPartyAsyncJs',
    title: 'Always load third-party JavaScript asynchronously',
    description:
      'Use JavaScript snippets that load the JS files asynchronously in order to speed up the user experience and avoid blocking the initial load.',
    advice:
      offending.length > 0
        ? 'The page has ' +
          offending.length +
          ' synchronous 3rd-party JavaScript request(s). Change it to be asynchronous instead.'
        : '',
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['performance', 'js']
  };
})(util);
