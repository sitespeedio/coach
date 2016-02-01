/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
(function(util) {
  'use strict';
  var message = '';
  var minLimit = 100;
  var score = 0;
  var offending = [];
  var images = Array.prototype.slice.call(document.getElementsByTagName('img'));
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    // skip images that are 0 (carousel etc)
    if ((img.clientWidth + minLimit) < img.naturalWidth && img.clientWidth > 0) {
      message = message + ' ' + util.getAbsoluteURL(img.src) + ' [browserWidth:' + img.clientWidth + ' naturalWidth: ' + img.naturalWidth +']';
      offending.push(util.getAbsoluteURL(img.src));
      score += 10;
    }
  }

  if (score>0) {
    message = 'The page got ' + (score/10) + ' images that are scaled in the browser: '+ message;
  }

  return {
    id: 'avoidScailingImages',
    title: 'Don\'t scale images in the browser',
    description: 'Scaling images inside the browser takes extra CPU time and will hurt performance on mobile and will make you download extra kilobytes',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['performance','image']
  };
})(util);
