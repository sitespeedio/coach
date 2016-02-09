(function() {
  var t = window.performance.timing;

  return {
    domainLookupTime: (t.domainLookupEnd - t.domainLookupStart),
    redirectionTime: (t.fetchStart - t.navigationStart),
    serverConnectionTime: (t.connectEnd - t.connectStart),
    serverResponseTime: (t.responseEnd - t.requestStart),
    pageDownloadTime: (t.responseEnd - t.responseStart),
    domInteractiveTime: (t.domInteractive - t.navigationStart),
    domContentLoadedTime: (t.domContentLoadedEventStart - t.navigationStart),
    pageLoadTime: (t.loadEventStart - t.navigationStart),
    frontEndTime: (t.loadEventStart - t.responseEnd),
    backEndTime: (t.responseStart - t.navigationStart)
  };
})();
