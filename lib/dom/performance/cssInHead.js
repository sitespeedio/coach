
(function(util) {
  'use strict';
  var message = '';
  var offending = util.getCSSFiles(document.body);
  var score = offending.length * 10;

  if (offending.length > 0) {
    message = 'There is ' + offending.length + ' CSS requests inside the body element, move them to the head instead.';
  }

  return {
    id: 'cssInHead',
    title: 'Load CSS files inside the head tag',
    description: 'Keep CSS files inside of the head tag to make pages render faster',
    advice: message,
    score: Math.max(0, 100 - score),
    offending: offending,
    weight: 3,
    tags: ['performance', 'css']
  };
})(util);
