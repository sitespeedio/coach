(function() {
  var t = window.performance.timing;
  var metrics =  {
    navigationStart: 0,
    unloadEventStart: t.unloadEventStart > 0 ? t.unloadEventStart - t.navigationStart : undefined,
    unloadEventEnd: t.unloadEventEnd > 0 ? t.unloadEventEnd - t.navigationStart : undefined,
    redirectStart: t.redirectStart > 0 ? t.redirectStart - t.navigationStart : undefined,
    redirectEnd: t.redirectEnd > 0 ? t.redirectEnd - t.navigationStart : undefined,
    fetchStart: t.fetchStart - t.navigationStart,
    domainLookupStart: t.domainLookupStart - t.navigationStart,
    domainLookupEnd: t.domainLookupEnd - t.navigationStart,
    connectStart: t.connectStart - t.navigationStart,
    connectEnd: t.connectEnd - t.navigationStart,
    secureConnectionStart: t.secureConnectionStart ? t.secureConnectionStart - t.navigationStart : undefined,
    requestStart: t.requestStart - t.navigationStart,
    responseStart: t.responseStart - t.navigationStart,
    responseEnd: t.responseEnd - t.navigationStart,
    domLoading: t.domLoading - t.navigationStart,
    domInteractive: t.domInteractive - t.navigationStart,
    domContentLoadedEventStart: t.domContentLoadedEventStart - t.navigationStart,
    domContentLoadedEventEnd: t.domContentLoadedEventEnd - t.navigationStart,
    domComplete: t.domComplete - t.navigationStart,
    loadEventStart: t.loadEventStart - t.navigationStart,
    loadEventEnd: t.loadEventEnd - t.navigationStart
  };

  // Selenium converts undefined to null so lets just remove
  // the undefined keys
  Object.keys(metrics).forEach(function(key) {
    if (metrics[key] === undefined) {
      delete metrics[key];
    }
  });

  return metrics;

})();
