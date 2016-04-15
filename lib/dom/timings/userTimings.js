(function() {
  var measures = [];
  var marks = [];

  if (window.performance && window.performance.getEntriesByType) {

    var myMarks = Array.prototype.slice.call(window.performance.getEntriesByType('mark'));

    myMarks.forEach(function(mark) {
      marks.push({
        name: mark.name,
        startTime: mark.startTime
      });
    });

    var myMeasures = Array.prototype.slice.call(window.performance.getEntriesByType('measure'));

    myMeasures.forEach(function(measure) {
      measures.push({
        name: measure.name,
        duration: measure.duration,
        startTime: measure.startTime
      })
    });
  }

  return {
    marks: marks,
    measures: measures
  };

})();
