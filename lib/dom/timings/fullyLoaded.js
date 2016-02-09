(function() {
  // lets use the Resource Timing API, so it is important that we run
  // this after all request/responses finished
  if (window.performance && window.performance.getEntriesByType) {
    var resources = window.performance.getEntriesByType('resource');
    var max = 0;

    for (var i = 1; i < resources.length; i++) {
      if (resources[i].responseEnd > max) {
        max = resources[i].responseEnd;
      }
    }
    return max;
  } else {
    return -1;
  }
})();
