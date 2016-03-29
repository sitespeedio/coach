
(function(util) {
  'use strict';
  var message = '';
  var offending = util.getCSSFiles(document.body);
  var score = offending.length * 10;

  // TODO this needs to align to https://jakearchibald.com/2016/link-in-body/
  if (offending.length > 0) {
    message = 'There are ' + offending.length + ' CSS requests inside the body element, move them to the head instead.';
  }

  return {
    id: 'cssInHead',
    title: 'Load CSS files inside the head tag',
    description: 'Keep CSS files inside of the head tag to avoid unnecessary reflow calculations by the browser causing performance issues.',
    advice: message,
    score: Math.max(0, 100 - score),
    offending: offending,
    weight: 3,
    tags: ['performance', 'css']
  };
})(util);
