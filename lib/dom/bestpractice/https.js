(function() {
  'use strict';
  var url = document.URL;
  var score = 100;
  var message = '';
  if (url.indexOf('https://') === -1) {
    score = 0;
    message = 'What!! The page is not using HTTPS. Every unencrypted HTTP request reveals information about user’s behavior, read more about it at https://https.cio.gov/everything/. You can get a totally free SSL/TLS certificate from https://letsencrypt.org/.';
  }

  return {
    id: 'https',
    title: 'Serve your content secure',
    description: 'A page should always use HTTPS ( https://https.cio.gov/everything/). Plus you will need it for HTTP/2!',
    advice: message,
    score: score,
    weight: 10,
    offending: [],
    tags: ['bestpractice']
  };
})();
