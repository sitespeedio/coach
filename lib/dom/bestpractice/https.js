(function() {
  'use strict';
  var url = document.URL;
  var score = 100;
  var message = '';
  if (url.indexOf('https://') === -1) {
    score = 0;
    message = 'What!! The page is not using HTTPS!';
  }

  return {
    id: 'https',
    title: 'Serve your content secure',
    description: 'A page should always use HTTPS. Plus you will need it for HTTP/2!',
    advice: message,
    score: score,
    weight: 10,
    offending: [],
    tags: ['bestpractice']
  };
})();
