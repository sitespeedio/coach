(function() {
  'use strict';
  var message = '';
  var score = 0;
  var offending = [];

  var cssFilesInHead = util.getCSSFiles(document.head);
  var styles = Array.prototype.slice.call(window.document.head.getElementsByTagName('style'));

  // if we use HTTP/2, do CSS request in head and inline CSS
  if (util.isHTTP2() && cssFilesInHead.length > 0 && styles.length > 0) {
    score += 5;
    message = 'The page both inline CSS and do CSS request even though it uses a HTTP/2ish connection. Make sure you are using server push for your CSS files (when your server supports push). If you have many users on slow connections, it can be better to only inline the CSS. Run your own tests and check the waterfall graph to see what happens.';
  }

  // If we got inline styles with HTTP/2 recommend that we push CSS responses instead if  ...
  else if (util.isHTTP2() && styles.length > 0 & cssFilesInHead.length === 0) {
    message += 'The page inline CSS and uses HTTP/2. Do you have a lot of users with slow connections on the site, it is good to inline CSS when using HTTP/2. If not and your server supports server push, use it to push the CSS files instead.'
  }
  // we have HTTP/2 and do CSS requests in HEAD.
  else if (util.isHTTP2() && cssFilesInHead.length > 0) {
    message += 'Make sure you push the CSS requests inside of HEAD (if your server supports push). Else it\'s better to inline the CSS.'
  }

  // If we have HTTP/1
  if (!util.isHTTP2()) {
    // and files served inside of head, let inline them instead
    if (cssFilesInHead.length > 0 && styles.length === 0) {
      score += 10 * cssFilesInHead.length;
      message = 'The page loads ' + cssFilesInHead.length + ' CSS request(s) inside of head, try to inline the CSS for first render and lazy load the rest. ';
      offending.push.apply(offending, cssFilesInHead);
    }
    // if we inline CSS and request CSS files inside of head
    if (styles.length > 0 && cssFilesInHead.length > 0) {
      score += 10;
      message += 'The page has both inline styles as well as it is requesting ' + cssFilesInHead.length + ' CSS file(s) inside of head. Let\'s only inline CSS for really fast render.';
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
