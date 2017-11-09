(function() {
  'use strict';
  var score = 100;

  if (window.google_tag_manager) {
    score = 0;
  }

  return {
    id: 'googleTagManager',
    title: 'Avoid using Google Tag Manager',
    description:
      'Google Tag Manager makes it possible for non tech users to add scripts to your page that will downgrade performance.',
    advice:
      score === 0
        ? 'The page is using Google Tag Manager, this is a performance risk, please stop.'
        : '',
    score: score,
    weight: 5,
    offending: [],
    tags: ['performance', 'js']
  };
})(util);
