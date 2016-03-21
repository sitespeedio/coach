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
      message = message + ' ' + util.getAbsoluteURL(img.currentSrc) + ' [browserWidth:' + img.clientWidth + ' naturalWidth: ' + img.naturalWidth +']';
      offending.push(util.getAbsoluteURL(img.currentSrc));
      score += 10;
    }
  }

  if (score>0) {
    message = 'The page has ' + (score/10) + ' images that are scaled more than ' + minLimit + ' pixels. It would be better if those images are sent so the browser don\'t need to scale them. Here\'s the image(s): '+ message;
  }

  return {
    id: 'avoidScalingImages',
    title: 'Don\'t scale images in the browser',
    description: 'Scaling images inside the browser takes extra CPU time and will hurt performance on mobile as well as make your users download extra kilobytes',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['performance','image']
  };
})(util);
