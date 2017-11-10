(function() {
  'use strict';

  if (window.navigator.connection) {
    return window.navigator.connection.effectiveType;
  } else {
    return 'unknown';
  }
})();
