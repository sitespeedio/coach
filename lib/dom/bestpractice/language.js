(function() {
  'use strict';

  var html = document.getElementsByTagName('html');
  var score = 100;
  var language = html[0].getAttribute('lang');
  var message = '';

  if (html.length > 0) {
    if (language === null) {
      score = 0;
      message =
        'The page is missing a language definition in the HTML tag. Define it with <html lang="YOUR_LANGUAGE_CODE">';
    }
  } else {
    score = 0;
    message = 'What! The page is missing the HTML tag!';
  }

  return {
    id: 'language',
    title: 'Declare the language code for your document',
    description:
      'According to the W3C recommendation you should declare the primary language for each Web page with the lang attribute inside the <html> tag https://www.w3.org/International/questions/qa-html-language-declarations#basics.',
    advice: message,
    score: score,
    weight: 3,
    offending: [],
    tags: ['bestpractice']
  };
})();
