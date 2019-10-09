(function() {
  'use strict';
  var description = document.querySelector('meta[name="generator"]');
  if (description) {
    return description.getAttribute('content');
  }
})();
