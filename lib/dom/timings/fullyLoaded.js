(function() {
  'use strict';

  // Let's use the Resource Timing API, so it is important that we run
  // this after all request/responses are finished
  if (window.performance && window.performance.getEntriesByType) {
    var resources = window.performance.getEntriesByType('resource');
    var max = 0;

    for (var i = 1, len = resources.length; i < len; i++) {
      if (resources[i].responseEnd > max) {
        max = resources[i].responseEnd;
      }
    }
    return max;
  } else {
    return -1;
  }
})();
