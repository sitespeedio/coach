(function() {
  'use strict';

  var tables = Array.prototype.slice.call(
    window.document.getElementsByTagName('table')
  );
  var score = 0;
  var offending = [];

  tables.forEach(function(table) {
    // we are missing a caption
    if (table.getElementsByTagName('caption').length === 0) {
      score += 5;
      if (table.id) {
        offending.push(table.id);
      }
    }
    var trs = table.getElementsByTagName('tr');
    if (trs[0] && trs[0].getElementsByTagName('th').length === 0) {
      score += 5;
      if (table.id) {
        offending.push(table.id);
      }
    }
  });

  return {
    id: 'table',
    title: 'Use caption and th in tables',
    description:
      'Add a caption element to give the table a proper heading or summary. Use th elements to denote column and row headings. Make use of their scope and other attributes to clearly associate what belongs to which. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice:
      score > 0
        ? 'The page has tables that are missing caption, please use them to give them a proper heading or summary.'
        : '',
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['accessibility', 'html']
  };
})();
