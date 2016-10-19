(function() {
  'use strict';

  var description = document.querySelector('meta[name="description"]');
  var og = document.querySelector('meta[property="og:description"]');
  if (description) {
    return description.getAttribute('content');
  } else if (og) {
    return og.getAttribute('content');
  } else {
    return '';
  }
})();
