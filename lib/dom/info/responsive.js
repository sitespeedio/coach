/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
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

  return {
    responsive: isResponsive
  };
})();
