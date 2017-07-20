(function(util) {
  'use strict';

  var maxLength = 155;
  var score = 100;
  var message = '';
  var metas = Array.prototype.slice.call(
    document.querySelectorAll('meta[name][content]')
  );
  metas = metas.filter(
    util.caseInsensitiveAttributeValueFilter('name', 'description')
  );
  var description = metas.length > 0 ? metas[0].getAttribute('content') : '';

  if (description.length === 0) {
    message = 'The page is missing a meta description.';
    score = 0;
  } else if (description.length > maxLength) {
    message =
      'The meta description is too long. It has ' +
      description.length +
      ' characters, the recommended max is ' +
      maxLength;
    score = 50;
  }

  // http://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf
  // https://d2eeipcrcdle6.cloudfront.net/seo-cheat-sheet.pdf

  return {
    id: 'metaDescription',
    title: 'Meta description',
    description:
      'Use a page description to make the page more relevant to search engines.',
    advice: message,
    score: score,
    weight: 5,
    offending: [],
    tags: ['bestpractice']
  };
})(util);
