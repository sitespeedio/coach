 (function(util) {
  'use strict';
  var offending = [];

  var links = document.getElementsByTagName('link');
  for (var i = 0, len = links.length; i < len; i += 1) {
    if (links[i].media === 'print') {
      offending.push(util.getAbsoluteURL(links[i].href));
    }
  }

  var score = offending.length * 10;

  return {
    id: 'cssPrint',
    title: 'Do not load print stylesheets, use @media type print instead',
    description: 'Loading a specific stylesheet for printing slows down the page, even though it is not used',
    advice: offending.length > 0 ? 'The page has ' + offending.length + ' print stylesheets.':'',
    score: Math.max(0, 100 - score),
    weight: 1,
    offending: offending,
    tags: ['performance', 'css']
  };

})(util);
