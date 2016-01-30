/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  return Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
})();
