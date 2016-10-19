(function() {
  'use strict';

  // we now do the same check as WebPageTest
  var isResponsive = true;
  var bodyScrollWidth = document.body.scrollWidth;
  var windowInnerWidth = window.innerWidth;
  var nodes = document.body.children;

  if (bodyScrollWidth > windowInnerWidth) {
    isResponsive = false;
  }

  for (var i in nodes) {
    if (nodes[i].scrollWidth > windowInnerWidth) {
      isResponsive = false;
    }
  }

  return isResponsive;
})();
