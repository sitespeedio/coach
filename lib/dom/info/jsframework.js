(function() {
  'use strict';
  return {
    angular: window.angular ? window.angular.version.full : false,
    backbone: window.Backbone ? window.Backbone.VERSION : false,
    preact: window.preact ? true : false,
    vue: window.Vue ? true : false
  };
})();
