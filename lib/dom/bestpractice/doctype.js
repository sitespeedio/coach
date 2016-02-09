(function() {
  'use strict';
  var score = 100;
  var message = '';
  var docType = document.doctype;
  if (docType === null) {
    message = 'The page is missing a doc type. Please use <!DOCTYPE html>';
    score = 0;
  }
  else if (document.firstChild.nodeType !== 10) {
    message = 'The page should have the the doctype declaration first in the HTML file and it should be declared using HTML5 standard: <!DOCTYPE html>';
    score = 50;
  }


  return {
    id: 'doctype',
    title: 'Use a doctype for your document',
    description: 'The <!DOCTYPE> declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in.',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
