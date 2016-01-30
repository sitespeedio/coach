/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function() {
  'use strict';
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return width + 'x' + height;
})();
