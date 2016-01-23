/**
 * @fileoverview Do we have alt atributes on all images?
 * @namespace advice/accessibility
 * @author Peter Hedenskog, Tobias Lidskog
 * @Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog and other contributors.
 * Released under the Apache 2.0 License.
 */
(function() {
  'use strict';

  var images = Array.prototype.slice.call(window.document.getElementsByTagName('img'));
  var score = 0;
  var offending = [];
  var missing = 0;
  var tooLong = 0;

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


  return {
    id: 'altImages',
    title: 'Always use alt attribute on image tags',
    description: 'All img tags require an alt attribute. This goes without exception. Everything else is an error. If you have an img tag in your HTML without an alt attribute, add it now. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: (score > 0) ? ('You have ' + missing + ' images that missing alt attribute(s) ' + (tooLong > 0) + '. '? ' You have ' + tooLong + ' where the alt text are  too long (longer than 125 characters).' : ''):'',
    score: 100 - score < 0 ? 0 : 100 - score,
    weight: 5,
    offending: offending,
    tags: ['accessibility','images']
  };

})();
