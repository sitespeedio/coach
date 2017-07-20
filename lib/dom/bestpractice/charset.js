(function() {
  'use strict';

  var score = 100;
  var message = '';
  var charSet = document.characterSet;

  if (charSet === null) {
    message =
      'The page is missing a character set. If you use Chrome/Firefox we know you are missing it, if you use another browser, it could be an implementation problem.';
    score = 0;
  } else if (charSet !== 'UTF-8') {
    message = 'You are not using charset UTF-8?';
    score = 50;
  }

  return {
    id: 'charset',
    title: 'Declare a charset in your document',
    description:
      'The Unicode Standard (UTF-8) covers (almost) all the characters, punctuations, and symbols in the world. Please use that.',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
