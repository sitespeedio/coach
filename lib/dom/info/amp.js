/**
 * @fileoverview Do this page use AMP?
 * @namespace advice/info
 * @author Peter Hedenskog, Tobias Lidskog
 * @Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog and other contributors.
 * Released under the Apache 2.0 License.
 */
 (function() {
  'use strict';
  var html = document.getElementsByTagName('html')[0];
  if (html && html.getAttribute('amp-version')) {
    return html.getAttribute('amp-version');
  } else {
    return false;
  }
})();
