(function(util) {
  'use strict';

  var images = Array.prototype.slice.call(
    window.document.getElementsByTagName('img')
  );
  var score = 0;
  var offending = [];
  var missing = 0;
  var tooLong = 0;
  var advice = '';
  var unique = {};

  images.forEach(function(image) {
    if (
      (!image.alt || image.alt === '') &&
      (image.getAttribute('role') !== 'presentation' ||
        !image.getAttribute('role'))
    ) {
      score += 10;
      missing++;
      if (image.src) {
        offending.push(image.src);
        unique[image.src] = 1;
      }
    } else if (image.alt && image.alt.length > 125) {
      // because of restrictions with the JAWS screen reader
      score += 5;
      offending.push(image.src);
      tooLong++;
    }
  });

  if (missing > 0) {
    advice =
      'The page has ' +
      missing +
      ' image' +
      util.plural(missing) +
      ' that lack alt attribute(s) and ' +
      Object.keys(unique).length +
      ' of them are unique.';
  }
  if (tooLong > 0) {
    advice +=
      'The page has ' +
      tooLong +
      ' image' +
      util.plural(tooLong) +
      ' where the alt text are too long (longer than 125 characters).';
  }

  return {
    id: 'altImages',
    title: 'Always use an alt attribute on image tags',
    description:
      'All img tags require an alt attribute. This goes without exception. Everything else is an error. If you have an img tag in your HTML without an alt attribute, add it now. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: advice,
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['accessibility', 'images']
  };
})(util);
