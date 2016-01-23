/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

(function(util) {
  'use strict';
  return {
    connectionType: util.getConnectionType(),
    message: (util.getConnectionType().toLowerCase().indexOf('spdy') > -1) ? 'The page is using SPDY, you should upgrade to HTTP/2 as soon as you have more users using H2 than SPDY.': ''
  };
})(util);
