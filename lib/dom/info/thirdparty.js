(function() {
  'use strict';
  return {
    boomerang: window.BOOMR ? window.BOOMR.version : false,
    newrelic: window.newrelic ? true : false,
    jquery: window.jQuery ? window.jQuery.fn.jquery : false,
    gtm: window.google_tag_manager ? true : false,
    ga: window.ga ? true : false,
    piwik: window.Piwik ? true : false
  };
})();
