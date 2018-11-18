(function() {
  'use strict';
  return {
    boomerang: window.BOOMR ? window.BOOMR.version : false,
    facebook: window.FB ? true : false,
    gtm: window.google_tag_manager ? true : false,
    ga: window.ga ? true : false,
    jquery: window.jQuery ? window.jQuery.fn.jquery : false,
    newrelic: window.newrelic ? true : false,
    matomo: window.Piwik ? true : window.Matomo ? true : false
  };
})();
