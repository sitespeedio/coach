(function() {
  // lets use the Resource Timing API, so it is important that we run
  // this after all request/responses finished
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType('resource');
    let max = 0;

    for (const resource of resources) {
      if (resource.responseEnd > max) {
        max = resource.responseEnd;
      }
    }
    return Number(max.toFixed(0));
  } else {
    return -1;
  }
})();
