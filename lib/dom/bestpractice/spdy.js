(function() {
  'use strict';
  var connectionType = util.getConnectionType();
  var score = 100;
  var message = '';
  if (connectionType.indexOf('spdy') !== -1) {
    score = 0;
    message = 'The page is using SPDY. Chrome dropped support for SPDY in Chrome 51. Change to HTTP/2 asap.';
  }

  return {
    id: 'spdy',
    title: 'EOL for SPDY in Chrome',
    description: 'Chrome dropped supports for SPDY in Chrome 51, upgrade to H2 as soon as possible.',
    advice: message,
    score: score,
    weight: 1,
    offending: [],
    tags: ['bestpractice']
  };
})();
