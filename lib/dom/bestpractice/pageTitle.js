/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  var max = 60;
  var score = 100;
  var message = '';
  var title = document.title;
  if (title.length === 0) {
    message = 'The page is missing a title.';
    score = 0;

  } else if (title.length > max) {
    message = 'The title is too long ' + title.length + ' recommended is ' + max;
    score = 50;
  }

  return {
    id: 'pageTitle',
    title: 'Page title',
    description: 'Use a title to make the page more relevant for a search engine.',
    advice: message,
    score: score,
    weight: 5,
    offending: [],
    tags: ['bestpractice']
  };
})();
