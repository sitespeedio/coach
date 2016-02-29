(function() {
  'use strict';
  var headings = ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'];
  var score = 0;
  var message = '';
  var sections = Array.prototype.slice.call(window.document.getElementsByTagName('section'));
  var totalSections = sections.length;

  if (totalSections === 0) {
    message = 'The page doesn\'t use sections. You could possible use them to get a better structure of your content.';
  } else {
    sections.forEach(function(section) {
      var hasHeading = false;
      headings.forEach(function(heading) {
        var tags = Array.prototype.slice.call(section.getElementsByTagName(heading));
        if (tags.length > 0) {
          hasHeading = true;
        }
      }, this);
      if (!hasHeading) {
        score += 10;
        message += ' The page is missing a heading within a section tag on the page.';
      }
    })
  }

  return {
    id: 'sections',
    title: 'Use headings tags within section tags to better structure your page',
    description: 'Section tags should have at least one heading element as a direct descendant.',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 0,
    offending: [],
    tags: ['accessibility', 'html']
  };

})();
