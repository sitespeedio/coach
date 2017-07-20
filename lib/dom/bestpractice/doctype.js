(function() {
  'use strict';

  var score = 100;
  var message = '';
  var docType = document.doctype;

  if (docType === null) {
    message = 'The page is missing a doctype. Please use <!DOCTYPE html>.';
    score = 0;
  } else if (
    !(
      docType.name.toLowerCase() === 'html' &&
      (docType.systemId === '' ||
        docType.systemId.toLowerCase() === 'about:legacy-compat')
    )
  ) {
    message =
      'Just do yourself a favor and use the HTML5 doctype declaration: <!DOCTYPE html>';
    score = 25;
  }

  return {
    id: 'doctype',
    title: 'Declare a doctype in your document',
    description:
      'The <!DOCTYPE> declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in.',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
