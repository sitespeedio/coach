(function() {
  const measures = [];
  const marks = [];

  if (window.performance && window.performance.getEntriesByType) {
    const myMarks = Array.prototype.slice.call(
      window.performance.getEntriesByType('mark')
    );

    for (const mark of myMarks) {
      marks.push({
        name: mark.name,
        startTime: mark.startTime
      });
    }

    const myMeasures = Array.prototype.slice.call(
      window.performance.getEntriesByType('measure')
    );

    for (const measure of myMeasures) {
      measures.push({
        name: measure.name,
        duration: measure.duration,
        startTime: measure.startTime
      });
    }
  }

  return {
    marks: marks,
    measures: measures
  };
})();
