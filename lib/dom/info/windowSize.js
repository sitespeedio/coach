(function() {
  'use strict';
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return width + 'x' + height;
})();
