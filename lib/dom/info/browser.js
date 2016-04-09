(function() {
  'use strict';
  var browser = 'unknown';
  var match = window.navigator.userAgent.match(/Chrome\/(\S+)/);
  browser = match ? 'Chrome ' + match[1] : browser;
  match = window.navigator.userAgent.match(/Firefox\/(\S+)/);
  browser = match ? 'Firefox ' + match[1] : browser;
  return browser;
})();
