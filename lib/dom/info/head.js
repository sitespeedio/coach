/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

(function(util) {
  'use strict';
  /*
    Get requests inside of head that will influence the start render
  */
  return {
    jssync: util.getSynchJSFiles(document.head),
    jsasync: util.getAsynchJSFiles(document.head),
    css: util.getCSSFiles(document.head)
  };
})(util);
