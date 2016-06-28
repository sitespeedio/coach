(function() {
  'use strict';
  var doWeUseUserTimingAPI = false;
  var message = 'Start using the User Timing API to measure specifics metrics for your page.';
  if (window.performance && window.performance.getEntriesByType) {
    if (window.performance.getEntriesByType('measure').length > 0 ||
      window.performance.getEntriesByType('mark').length > 0) {
      doWeUseUserTimingAPI = true;
      message = '';
    }
  } else {
    message = 'NOTE: User timing is not supported in this browser.';
  }

  return {
    id: 'userTiming',
    title: 'Use the User Timing API to check your performance',
    description: 'The User Timing API is a perfect way to start measuring specific and custom metrics for your site. Use it.',
    advice: message,
    score: doWeUseUserTimingAPI ? 100 : 0,
    weight: 1,
    offending: [],
    tags: ['performance']
  };
})();
