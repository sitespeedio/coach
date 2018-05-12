(function() {
  const t = window.performance.getEntriesByType('navigation')[0];
  const d = 0;
  return {
    connectStart: Number(t.connectStart.toFixed(d)),
    domComplete: Number(t.domComplete.toFixed(d)),
    domContentLoadedEventEnd: Number(t.domContentLoadedEventEnd.toFixed(d)),
    domContentLoadedEventStart: Number(t.domContentLoadedEventStart.toFixed(d)),
    domInteractive: Number(t.domInteractive.toFixed(d)),
    domainLookupEnd: Number(t.domainLookupEnd.toFixed(d)),
    domainLookupStart: Number(t.domainLookupStart.toFixed(d)),
    duration: Number(t.duration.toFixed(d)),
    fetchStart: Number(t.fetchStart.toFixed(d)),
    loadEventEnd: Number(t.loadEventEnd.toFixed(d)),
    loadEventStart: Number(t.loadEventStart.toFixed(d)),
    redirectEnd: Number(t.redirectEnd.toFixed(d)),
    redirectStart: Number(t.redirectStart.toFixed(d)),
    requestStart: Number(t.requestStart.toFixed(d)),
    responseEnd: Number(t.responseEnd.toFixed(d)),
    responseStart: Number(t.responseStart.toFixed(d)),
    secureConnectionStart: Number(t.secureConnectionStart.toFixed(d)),
    startTime: Number(t.startTime.toFixed(d)),
    unloadEventEnd: Number(t.unloadEventEnd.toFixed(d)),
    unloadEventStart: Number(t.unloadEventStart.toFixed(d)),
    workerStart: Number(t.workerStart.toFixed(d))
  };
})();
