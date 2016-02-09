(function() {
  'use strict';

  var images = Array.prototype.slice.call(window.document.getElementsByTagName('img'));
  var score = 0;
  var offending = [];
  var missing = 0;
  var tooLong = 0;
  var advice = '';

  images.forEach(function(image) {
    if (!image.alt || image.alt === '') {
      score+=10;
      missing++;
      if (image.src) {
        offending.push(image.src);
      }
    }
    //  because of restrictions within the JAWS screen reader
    else if (image.alt && image.alt.length>125) {
      score+=5;
      offending.push(image.src);
      tooLong++;
    }
  });

  if (missing>0) {
    advice = 'The page has ' + missing + ' images that missing alt attribute(s).'
  }
  if (tooLong>0) {
    advice += 'The page has ' + tooLong + 'images where the alt text are too long (longer than 125 characters).'
  }

  return {
    id: 'altImages',
    title: 'Always use alt attribute on image tags',
    description: 'All img tags require an alt attribute. This goes without exception. Everything else is an error. If you have an img tag in your HTML without an alt attribute, add it now. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: advice,
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['accessibility','images']
  };

})();
