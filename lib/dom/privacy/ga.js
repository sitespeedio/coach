(function() {
  'use strict';

  var score = 100;
  var offending = [];

  if (window.ga && window.ga.create) {
    score = 0;
  }

  return {
    id: 'ga',
    title: 'Avoid using Google Analytics',
    description:
      "Google Analytics share private user information with Google that your user hasn't agreed on sharing.",
    advice:
      score === 0
        ? 'The page is using Google Analytics meaning you share your users private information with Google. You should use analytics that care about user privacy, something like https://matomo.org.'
        : '',
    score: score,
    weight: 8,
    offending: offending,
    tags: ['privacy']
  };
})();
