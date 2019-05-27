(function() {
  'use strict';

  var score = 100;
  var docDomain = document.domain;
  var offending = [];
  var offenders = ['.google.', 'facebook.com', 'youtube.', 'yahoo.com'];

  for (var i = 0; i < offenders.length; i++) {
    if (docDomain.indexOf(offenders[i]) > -1) {
      score = 0;
      offending.push(docDomain);
    }
  }

  return {
    id: 'surveillance',
    title: 'Avoid using surveillance web sites',
    description:
      'Do not use web sites that harvest private user information and sell it to other companies.',
    advice:
      score === 0
        ? docDomain +
          ' uses harvest user information and sell it to other companies without the users agreement. That is not OK.'
        : '',
    score: score,
    weight: 10,
    offending: offending,
    tags: ['privacy']
  };
})();
