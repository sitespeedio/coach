(function() {
  'use strict';
  var connectionType = util.getConnectionType();
  var score = 100;
  var message = '';
  if (connectionType.indexOf('spdy') !== -1) {
    score = 0;
    message = 'The page is using SPDY. Chrome will drop support for SPDY  May 15th. Change to HTTP/2 asap.';
  }

  return {
    id: 'spdy',
    title: 'EOL for SPDY coming soon.',
    description: 'Chrome will drop supports for SPDY May 15th, so you should upgrade to H2 asap.',
    advice: message,
    score: score,
    weight: 1,
    offending: [],
    tags: ['bestpractice']
  };
})();
