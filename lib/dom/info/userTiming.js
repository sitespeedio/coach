(function() {
  'use strict';

  var mark = 0;
  var measure = 0;
  if (window.performance && window.performance.getEntriesByType) {
    measure = window.performance.getEntriesByType('measure').length;
    mark = window.performance.getEntriesByType('mark').length;
  }
  return {
    marks: mark,
    measures: measure
  };
})();
