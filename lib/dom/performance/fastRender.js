(function(util) {
  'use strict';
  var message = '';
  var score = 0;
  var offending = [];

  var styles = util.getCSSFiles(document.head);
  var scripts = util.getSynchJSFiles(document.head);

  var docDomain = document.domain;
  var domains = [];
  var blockingCSS = 0;
  var blockingJS = 0;

  // TODO add check for preconnect

  // TODO we should be able to use same functionality here
  if (util.isHTTP2()) {
    if (styles.length > 0) {
      message = 'Make sure that the server pushes your CSS resources for faster rendering. ';
    }
    if (scripts.length > 0) {
      score = scripts.length * 5;
      scripts.forEach(function(script) {
      offending.push(script);
      });
      blockingJS++;
      message += 'Avoid loading syncronously Javascript inside of head, you shouldn\'t need Javascript to intially render your page!';
    }
  } else {
    styles.forEach(function(style) {
      var styleDomain = util.getHostname(style);
      if (styleDomain !== docDomain) {
        offending.push(style);

        score += util.exists(styleDomain, domains) ? 5 : 10;
        domains.push(styleDomain);
        blockingCSS++;
      } else {
        offending.push(style);
        score += 5;
        blockingCSS++;
      }
    });

    scripts.forEach(function(script) {
      var scriptDomain = util.getHostname(script);
      if (scriptDomain !== docDomain) {

        score += util.exists(scriptDomain, domains) ? 5 : 10;

        offending.push(script);
        domains.push(scriptDomain);
        blockingJS++;
      } else {
        score += 5;
        offending.push(script);
        blockingJS++;
      }
    });

    if (offending.length > 0) {
      message += ' The page got ' + blockingCSS + ' render blocking CSS request(s) and ' + blockingJS + ' Javascript request(s) inside of head. ';
    }

  }

  return {
    id: 'fastRender',
    title: 'Avoid slowing down the rendering critical path',
    description: 'Every file requested inside of head will postpone the rendering of the page. Try to avoid loading Javascript synchronously, request files from the same domain as the main document, and inline CSS or server push for really fast rendering.',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 10,
    offending: offending,
    tags: ['performance']
  };
})(util);
