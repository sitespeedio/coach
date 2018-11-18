(function() {
  'use strict';

  var score = 100;
  var offending = [];

  if (window.YT) {
    score = 0;
  }

  return {
    id: 'youtube',
    title: 'Avoid including Youtube videos',
    description:
      'If you include Youtube videos on your page, you are sharing private user information with Google.',
    advice:
      score === 0
        ? 'The page is including code from Youtube. You share user private information with Google. Instead you can host a video screenshot and let the user choose to go to Youtube or not, by clicking on the screenshot. You can look at http://labnol.org/?p=27941 and make sure you host your screenshot yourself. Or choose another video service.'
        : '',
    score: score,
    weight: 6,
    offending: offending,
    tags: ['privacy']
  };
})();
