(function() {
  'use strict';

  var message = '';
  var score = 0;
  var offending = [];

  var cssFilesInHead = util.getCSSFiles(document.head);
  var styles = Array.prototype.slice.call(
    window.document.head.getElementsByTagName('style')
  );

  // If we use HTTP/2, do CSS request in head and inline CSS
  if (util.isHTTP2() && cssFilesInHead.length > 0 && styles.length > 0) {
    score += 5;
    message =
      'The page has both inline CSS and CSS requests even though it uses a HTTP/2-ish connection. If you have many users on slow connections, it can be better to only inline the CSS. Run your own tests and check the waterfall graph to see what happens.';
  } else if (
    util.isHTTP2() &&
    styles.length > 0 &&
    cssFilesInHead.length === 0
  ) {
    // If we got inline styles with HTTP/2, recommend that we push CSS responses instead
    message +=
      'The page has inline CSS and uses HTTP/2. Do you have a lot of users with slow connections on the site? It is good to inline CSS when using HTTP/2. If not, and your server supports server push, you can probably push the CSS files instead.';
  } else if (util.isHTTP2() && cssFilesInHead.length > 0) {
    // we have HTTP/2 and do CSS requests in HEAD.
    message +=
      'It is always faster for the user if you inline CSS instead of making a CSS request.';
  }

  // If we have HTTP/1
  if (!util.isHTTP2()) {
    // and files served inside of head, inline them instead
    if (cssFilesInHead.length > 0 && styles.length === 0) {
      score += 10 * cssFilesInHead.length;
      message =
        'The page loads ' +
        cssFilesInHead.length +
        ' CSS request(s) inside of head, try to inline the CSS for the first render and lazy load the rest.';
      offending.push.apply(offending, cssFilesInHead);
    }
    // If we inline CSS and request CSS files inside of head
    if (styles.length > 0 && cssFilesInHead.length > 0) {
      score += 10;
      message +=
        'The page has both inline styles as well as it is requesting ' +
        cssFilesInHead.length +
        " CSS file(s) inside of the head. Let's only inline CSS for really fast render.";
      offending.push.apply(offending, cssFilesInHead);
    }
  }

  return {
    id: 'inlineCss',
    title: 'Inline CSS for faster first render',
    description:
      'In the early days of the Internet, inlining CSS was one of the ugliest things you can do. That has changed if you want your page to start rendering fast for your user. Always inline the critical CSS when you use HTTP/1 and HTTP/2 (avoid doing CSS requests that block rendering) and lazy load and cache the rest of the CSS. It is a little more complicated when using HTTP/2. Does your server support HTTP push? Then maybe that can help. Do you have a lot of users on a slow connection and are serving large chunks of HTML? Then it could be better to use the inline technique, becasue some servers always prioritize HTML content over CSS so the user needs to download the HTML first, before the CSS is downloaded.',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 7,
    offending: offending,
    tags: ['performance', 'css']
  };
})();
