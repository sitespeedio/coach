/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  var message = '';
  var score = 0;
  var offending = [];

  var cssFilesInHead = util.getCSSFiles(document.head);
  var styles = Array.prototype.slice.call(window.document.head.getElementsByTagName('style'));

  // if we use HTTP/2 and has CSS files, give an advice to push them
  if (util.isHTTP2() && cssFilesInHead.length > 0) {
    message = 'Make sure you are using server push for your CSS files (when your server supports push). If you have many users on slow connections, it can be better to inline the CSS file(s). Make sure to run your own tests.';
  }

  // If we got inline styles with HTTP/2 recommend that we push CSS responses instead
  if (util.isHTTP2() && styles.length > 0) {
    score += 10;
    message += 'Do you have a lot of users with slow connections on the site, it could be good to inline CSS when using HTTP2. If not and your server supports server push, use that to push the CSS files instead.'
  }

  // If we have HTTP/1
  if (!util.isHTTP2()) {
    // and files served inside of head, let inline them instead
    if (cssFilesInHead.length > 0 && styles.length === 0) {
      score += 10 * cssFilesInHead.length;
      message = 'Try to inline the CSS for first render and lazy load the rest. ';
      offending.push.apply(offending, cssFilesInHead);
    }
    // if we inline CSS and request CSS files inside of head
    if (styles.length > 0 && cssFilesInHead.length > 0) {
      score += 10;
      message += 'The page got both inline styles and do request CSS files inside of head. Lets only inline CSS for really fast render.';
      offending.push.apply(offending, cssFilesInHead);
    }
  }

  return {
    id: 'inlineCss',
    title: 'Inline CSS for faster first render on HTTP/1',
    description: 'Always inline the CSS when you use HTTP/1. Using HTTP/2 it is complicated. Do your users have a slow connection? Then it\s better to inline.',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 7,
    offending: offending,
    tags: ['performance', 'css']
  };
})();
