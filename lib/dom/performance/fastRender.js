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
  // TODO does preconnect really matter when you are inside of head?
  var preconnects = util.getResourceHintsHrefs('preconnect');
  var preconnectDomains = preconnects.map(function(preconnect) {
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
      message =
        'Maybe you could server push your CSS resources for faster rendering but that is actually really hard to get right :(. ';
      // check the size
      styles.forEach(function(url) {
        if (util.getTransferSize(url) > 14500) {
          offending.push(url);
          score += 5;
          blockingCSS++;
          message +=
            'The style ' +
            url +
            ' is larger than the magic number TCP window size 14.5 kB. Make the file smaller and the page will render faster. ';
        }
      });
    }
    if (scripts.length > 0) {
      score += scripts.length * 10;
      scripts.forEach(function(url) {
        offending.push(url);
        blockingJS++;
      });
      message +=
        "Avoid loading synchronously JavaScript inside of head, you shouldn't need JavaScript to render your page! ";
    }
  } else {
    // we are using HTTP/1
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
    message +=
      'The page has ' +
      blockingCSS +
      ' render blocking CSS request(s) and ' +
      blockingJS +
      ' blocking JavaScript request(s) inside of head.';
  }

  return {
    id: 'fastRender',
    title: 'Avoid slowing down the critical rendering path',
    description:
      'The critical rendering path is what the browser needs to do to start rendering the page. Every file requested inside of the head element will postpone the rendering of the page, because the browser need to do the request. Avoid loading JavaScript synchronously inside of the head (you should not need JavaScript to render the page), request files from the same domain as the main document (to avoid DNS lookups) and inline CSS or use server push for really fast rendering and a short rendering path.',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 10,
    offending: offending,
    tags: ['performance']
  };
})(util);
