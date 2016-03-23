(function(util) {
  'use strict';
  var message = '';
  var offending = util.getCSSFiles(document.head);
  var score = 0;

  if (!util.isHTTP2() &&  offending.length > 4) {
    message = 'The page has ' +  offending.length + ' CSS requests inside of head. They should be combined.';
    score = offending.length * 10;
  } else {
    offending = [];
  }

  return {
    id: 'combineCss',
    title: 'Combine CSS files inside head if HTTP/1',
    description: 'Combining CSS requests inside of head for HTTP/1 is good.',
    advice: message,
    score: Math.max(0, 100 - score),
    offending: offending,
    weight: 3,
    tags: ['performance', 'css']
  };
})(util);
