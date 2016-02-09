(function() {
  'use strict';
  var html = document.getElementsByTagName('html')[0];
  if (html && html.getAttribute('amp-version')) {
    return html.getAttribute('amp-version');
  } else {
    return false;
  }
})();
