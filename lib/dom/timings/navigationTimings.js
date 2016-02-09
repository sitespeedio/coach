(function() {
  var t = window.performance.timing;
  return {
    navigationStart: t.navigationStart,
    unloadEventStart: t.unloadEventStart,
    unloadEventEnd: t.unloadEventEnd,
    redirectStart: t.redirectStart,
    redirectEnd: t.redirectEnd,
    fetchStart: t.fetchStart,
    domainLookupStart: t.domainLookupStart,
    domainLookupEnd: t.domainLookupEnd,
    connectStart: t.connectStart,
    connectEnd: t.connectEnd,
    secureConnectionStart: t.secureConnectionStart,
    requestStart: t.requestStart,
    responseStart: t.responseStart,
    responseEnd: t.responseEnd,
    domLoading: t.domLoading,
    domInteractive: t.domInteractive,
    domContentLoadedEventStart: t.domContentLoadedEventStart,
    domContentLoadedEventEnd: t.domContentLoadedEventEnd,
    domComplete: t.domComplete,
    loadEventStart: t.loadEventStart,
    loadEventEnd: t.loadEventEnd
  };
})();
