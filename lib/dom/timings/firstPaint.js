(function() {
  'use strict';
  var p = window.performance,
    timing = p.timing,
    entries = p.getEntriesByType('paint');

  if (entries.length > 0) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].name === 'first-paint')
        return Number(entries[i].startTime.toFixed(0));
    }
  } else if (timing.timeToNonBlankPaint) {
    return Number(
      (timing.timeToNonBlankPaint - timing.navigationStart).toFixed(0)
    );
  } else if (typeof timing.msFirstPaint === 'number') {
    return timing.msFirstPaint - timing.navigationStart;
  }
  return undefined;
})();
