(function() {
  'use strict';
  var score = 100;

  if (window.google_tag_manager) {
    score = 0;
  }

  return {
    id: 'googletagmanager',
    title: 'Avoid using Google Tag Manager',
    description:
      'Google Tag Manager makes it possible for non tech users to add scripts to your page that will downgrade performance.',
    advice:
      score === 0
        ? 'The page is using Google Tag Manager, this is a performance risk since non-tech users can add JavaScript to your page.'
        : '',
    score: score,
    weight: 5,
    offending: [],
    tags: ['performance', 'js']
  };
})();
