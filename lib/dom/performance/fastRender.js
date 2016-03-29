(function(util) {
  'use strict';
  var message = '',
    score = 0,
    offending = [],
    styles = util.getCSSFiles(document.head),
    scripts = util.getSynchJSFiles(document.head),
    docDomain = document.domain,
    domains = [],
    blockingCSS = 0,
    blockingJS = 0,
    // TODO do the preconnect really matter when you are inside of head?
    preconnects = util.getResourceHintsHrefs('preconnect'),
    preconnectDomains = preconnects.map(function(preconnect) {
    return util.getHostname(preconnect);
  });

  function testByType(assetUrl) {
    var domain = util.getHostname(assetUrl);
    // if it is from different domain or not
    if (domain !== docDomain) {
      offending.push(assetUrl);
      // is this the first time this domain is used?
      if (!util.exists(domain, domains)) {
        // hurt depending on if it's preconnected or not
        score += util.exists(domain, preconnectDomains) ? 5 : 10;
        domains.push(domain);
      }
      score += 5;
    } else {
      offending.push(assetUrl);
      score += 5;
    }
  }

  // TODO do we have a way to check if we different domains act as one for H2?
  // know we don't even check it
  if (util.isHTTP2()) {
    if (styles.length > 0) {
      message = 'Make sure that the server pushes your CSS resources for faster rendering. ';
      // check the size
      styles.forEach(function(url) {
        if (util.getTransferSize(url) > 14500) {
          offending.push(url);
          score += 5;
          blockingCSS++;
          message += 'The style ' + url + ' is larger than the magic number TCP window size 14.5 kB. Make the file smaller and the page will render faster. '
        }

      })
    }
    if (scripts.length > 0) {
      score += scripts.length * 10;
      scripts.forEach(function(url) {
        offending.push(url);
        blockingJS++;
      });
      message += 'Avoid loading syncronously Javascript inside of head, you shouldn\'t need Javascript to render your page!';
    }
  }
  // we are using HTTP/1
  else {
    styles.forEach(function(style) {
      testByType(style);
    });
    blockingCSS = styles.length;
    scripts.forEach(function(script) {
      testByType(script);
    });
    blockingJS = scripts.length;

  }

  if (offending.length > 0) {
    message += 'The page has ' + blockingCSS + ' render blocking CSS request(s) and ' + blockingJS + ' blocking Javascript request(s) inside of head.';
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
