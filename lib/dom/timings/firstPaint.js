(function() {
  if (window.chrome && window.chrome.loadTimes) {
    var firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
    return firstPaint - (window.chrome.loadTimes().startLoadTime * 1000);
  } else if (typeof window.performance.timing.msFirstPaint === 'number') {
    var fp = window.performance.timing.msFirstPaint;
    return fp - window.performance.timing.navigationStart;
  } else {
    return -1;
  }
})();
