(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    // Only report activated service workers
    if (navigator.serviceWorker.controller) {
      if (navigator.serviceWorker.controller.state === 'activated') {
        return navigator.serviceWorker.controller.scriptURL;
      } else return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
})();
