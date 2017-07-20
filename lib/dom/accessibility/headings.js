(function() {
  'use strict';

  var headings = ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'];
  var score = 0;
  var totalHeadings = 0;
  var message = '';

  headings.forEach(function(heading) {
    totalHeadings += Array.prototype.slice.call(
      window.document.getElementsByTagName(heading)
    ).length;
  });

  if (totalHeadings === 0) {
    score = 100;
    message =
      'The page is missing headings. Use them to get a better structure of your content.';
  } else {
    var hadLowerHeading = false;
    var messages = [];

    headings.forEach(function(heading) {
      var tags = Array.prototype.slice.call(
        window.document.getElementsByTagName(heading)
      );
      if (hadLowerHeading && tags.length === 0) {
        score += 10;
        messages.push(
          'The page is missing a ' +
            heading +
            ' and has heading(s) with lower priority.'
        );
      }
      if (tags.length > 0) {
        hadLowerHeading = true;
      }
    });

    message = messages.join(' ');
  }

  return {
    id: 'headings',
    title: 'Use heading tags to structure your page',
    description:
      'Headings give your document a logical, easy to follow structure. Have you ever wondered how Wikipedia puts together its table of contents for each article? They use the logical heading structure for that, too! The H1 through H6 elements are unambiguous in telling screen readers, search engines and other technologies what the structure of your document is. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 4,
    offending: [],
    tags: ['accessibility', 'html']
  };
})();
