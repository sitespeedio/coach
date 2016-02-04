/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

(function(util) {
  'use strict';
  return {
    'dns-prefetch': util.getResourceHintsHrefs('dns-prefetch'),
    preconnect: util.getResourceHintsHrefs('preconnect'),
    prefetch: util.getResourceHintsHrefs('prefetch'),
    prerender: util.getResourceHintsHrefs('prerender')
  };
})(util);
