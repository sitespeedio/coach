(function() {
  'use strict';

  var score = 100;
  var offending = [];

  if (window.FB) {
    score = 0;
  }

  return {
    id: 'facebook',
    title: 'Avoid including Facebook',
    description:
      "You share share private user information with Facebook that your user hasn't agreed on sharing.",
    advice:
      score === 0
        ? 'The page is using Facebook includes meaning you share your users private information with Facebook.'
        : '',
    score: score,
    weight: 8,
    offending: offending,
    tags: ['privacy']
  };
})();
