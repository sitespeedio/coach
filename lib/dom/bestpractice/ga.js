(function() {
  'use strict';

  var score = 100;
  var offending = [];

  if (window.ga && window.ga.create) {
    score = 0;
  }

  return {
    id: 'googleanalytics',
    title: 'Avoid using Google Analytics',
    description:
      "Google Analytics share private user information with Google that your user hasn't agreed on sharing. You should look at an solution that don't sell your user data like piwik.",
    advice:
      score === 0
        ? 'The page is using Google Analytics, meaning you are giving your users behavoir for free to Google.'
        : '',
    score: score,
    weight: 4,
    offending: offending,
    tags: ['bestpractice']
  };
})(util);
