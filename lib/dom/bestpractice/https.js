/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  var url = document.URL;
  var score = 100;
  var message = '';
  if (url.indexOf('https://') === -1) {
    score = 0;
    message = 'What!! Your page is not using HTTPS!';
  }

  return {
    id: 'https',
    title: 'Serve your content secure',
    description: 'You Should Always Use HTTPS',
    advice: message,
    score: score,
    weight: 10,
    offending: [],
    tags: ['bestpractice']
  };
})();
