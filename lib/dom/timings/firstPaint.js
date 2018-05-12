(function() {
  let p = window.performance,
    timing = p.timing,
    entries = p.getEntriesByType('paint');

  if (entries.length > 0) {
    for (const entry of entries) {
      if (entry.name === 'first-paint')
        return Number(entry.startTime.toFixed(0));
    }
  } else if (timing.timeToNonBlankPaint) {
    return Number(
      (timing.timeToNonBlankPaint - timing.navigationStart).toFixed(0)
    );
  }
  return undefined;
})();
