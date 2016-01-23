/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  var score = 100;
  var message = '';
  // TODO we shoudl check that the HTML meta tag is set
  var charSet = document.characterSet;
  if (charSet === null) {
    message = 'The page is missing a character set. If you use Chrome/Firefox we know your are missing it, if you use another browser, well could be an implementation problem.';
    score = 0;
  } else if (charSet !== 'UTF-8') {
    message = 'You are not using charset UTF-8?'
    score = 50;
  }
  return {
    id: 'charset',
    title: 'Use charset for your document',
    description: 'The Unicode Standard (UTF-8) covers (almost) all the characters, punctuations, and symbols in the world. Please use that.',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
