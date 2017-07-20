(function() {
  'use strict';

  var score = 100;
  var message = '';
  var url = document.URL;

  // ok all Java lovers, please do not use the sessionid in your URLs
  if (url.indexOf('?') > -1 && url.indexOf('jsessionid') > url.indexOf('?')) {
    score = 0;
    message =
      'The page has the session id for the user as a parameter, please change so the session handling is done only with cookies. ';
  }

  var parameters = (url.match(/&/g) || []).length;
  if (parameters > 1) {
    score -= 50;
    message +=
      'The page is using more than two request parameters. You should really rethink and try to minimize the number of parameters. ';
  }

  if (url.length > 100) {
    score -= 10;
    message +=
      'The URL is ' +
      url.length +
      ' characters long. Try to make it less than 100 characters. ';
  }

  if (url.indexOf(' ') > -1 || url.indexOf('%20') > -1) {
    score -= 10;
    message +=
      'Could the developer or the CMS be on Windows? Avoid using spaces in the URLs, use hyphens or underscores. ';
  }

  return {
    id: 'url',
    title: 'Have a good URL format',
    description:
      'A clean URL is good for the user and for SEO. Make them human readable, avoid too long URLs, spaces in the URL, too many request parameters, and never ever have the session id in your URL.',
    advice: message,
    score: score < 0 ? 0 : score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
