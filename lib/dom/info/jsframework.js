(function() {
  'use strict';
  return {
    angular: window.angular ? window.angular.version.full : false,
    preact: window.preact ? true : false,
    vue: window.Vue ? true : false
  };
})();
