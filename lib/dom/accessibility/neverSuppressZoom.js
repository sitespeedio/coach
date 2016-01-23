/**
 * @fileoverview Don\'t suppress pinch zoom.
 * @namespace advice/accessibility
 * @author Peter Hedenskog, Tobias Lidskog
 * @Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog and other contributors.
 * Released under the Apache 2.0 License.
 */
(function() {
  'use strict';

  var metas = Array.prototype.slice.call(window.document.head.getElementsByTagName('meta'));
  var score = 100;
  var offending = [];
  metas.forEach(function(meta) {
    if (meta.name === 'viewport') {
      if (meta.content.indexOf('user-scalable=no')>-1 || meta.content.indexOf('initial-scale=1.0; maximum-scale=1.0') > -1) {
        score = 0;
        offending.push(meta);
      }
    }
  });

  return {
    id: 'neverSuppressZoom',
    title: 'Don\'t suppress pinch zoom',
    description: 'A key feature of mobile browsing is being able to zoom in to read content and out to locate content within a page. http://www.iheni.com/mobile-accessibility-tip-dont-suppress-pinch-zoom/',
    advice: score === 0 ? 'What! The page suppress zooming, you really shouldn\'t do that.' : '',
    score: score,
    weight: 8,
    offending: offending,
    tags: ['accessibility']
  };

})();
