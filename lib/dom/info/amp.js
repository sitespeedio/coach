(function() {
  'use strict';

  var html = document.getElementsByTagName('html')[0];

  if ((html && html.getAttribute('amp-version')) || window.AMP) {
    return html.getAttribute('amp-version') || true;
  } else {
    return false;
  }
})();
