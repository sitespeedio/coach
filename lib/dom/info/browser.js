(function() {
  'use strict';
  var browser = 'unknown';
  var match = window.navigator.userAgent.match(/(Chrome|Firefox)\/(\S+)/);
  browser = match ? match[1] + ' ' + match[2] : browser;
  return browser;
})();
