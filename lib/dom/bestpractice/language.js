/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  var html = document.getElementsByTagName('html');
  if (html.length > 0) {
    var language = html[0].getAttribute('lang');
    var score = 100;
    var message = '';
    if (language === null) {
      score = 0;
      message = 'You are missing a language definition in you HTML tag. Define it <html lang="YOUR_LANGUAGE_CODE"> '
    }
  } else {
    score = 0;
    message = 'What! The page is missing the HTML tag.';
  }

  return {
    id: 'language',
    title: 'Set the language code for your document.',
    description: 'According to the W3C recommendation you should declare the primary language for each Web page with the lang attribute inside the <html> tag.',
    advice: message,
    score: score,
    weight: 3,
    offending: [],
    tags: ['bestpractice']
  };
})();
