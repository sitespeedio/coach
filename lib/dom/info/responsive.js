(function() {
  'use strict';

  // we now do the same check as WebPageTest
  var isResponsive = true;
  var bsw = document.body.scrollWidth;
  var wiw = window.innerWidth;
  if (bsw > wiw)
    isResponsive = false;
  var nodes = document.body.children;
  for (var i in nodes) {
    if (nodes[i].scrollWidth > wiw)
      isResponsive = false;
  }

  return isResponsive;
})();
