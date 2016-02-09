(function() {
  'use strict';
  var score = 100;
  var message = '';
  var url = document.URL;

  // ok all Java lovers, please not use the sessionid in your URLS
  if (url.indexOf('?') > -1 && (url.indexOf('jsessionid') > url.indexOf('?'))) {
    score = 0;
    message = 'The page has the session id for the user as a parameter, please change so the session handling is done only with cookies. ';
  }

  var parameters = (url.match(/&/g) || []).length;
  if (parameters > 1) {
    score -= 50;
    message += 'The page are using more than two request parameters. You should really rethink and try to minimize the number of parameters. ';
  }

  if (url.length > 100) {
    score -= 10;
    message += 'The URL is ' + url.length + ' character long. Try to make it smaller than 100 characters. '
  }

  if (url.indexOf(' ') > -1 || url.indexOf('%20') > -1) {
    score -= 10;
    message += 'Could the developer or the CMS be on Windows? Avoid using spaces in the URLs, use hyphens or underscores. '
  }

  return {
    id: 'url',
    title: 'URL',
    description: 'Clean URL are good for the user and for SEO. Make the human readable, avoid too long URLs, spaces in the URL, too many request parameters and never ever have the session id in your URL.',
    advice: message,
    score: score<0 ? 0 : score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
