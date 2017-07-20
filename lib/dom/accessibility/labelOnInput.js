(function() {
  'use strict';

  function getMatchingLabel(id, labels) {
    return labels.filter(function(entry) {
      return entry.attributes.for && entry.attributes.for.value === id;
    });
  }

  function hasLabel(input, labels) {
    return input.id && getMatchingLabel(input.id, labels).length > 0;
  }

  function isExcluded(input, excludedInputTypes) {
    return excludedInputTypes.includes(input.type);
  }

  function isInsideLabel(input) {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
    return input.parentElement.nodeName === 'LABEL';
  }

  var labels = Array.prototype.slice.call(
    window.document.getElementsByTagName('label')
  );

  var score = 0;
  var offending = [];
  var inputs = Array.prototype.slice.call(
    window.document.querySelectorAll('input, textarea, select')
  );
  var excludedInputTypes = ['button', 'hidden', 'image', 'reset', 'submit'];

  inputs.forEach(function(input) {
    if (
      isExcluded(input, excludedInputTypes) ||
      isInsideLabel(input) ||
      hasLabel(input, labels)
    ) {
      return;
    }

    offending.push(input.id || input.name || input.outerHTML);
    score += 10;
  });

  return {
    id: 'labelOnInput',
    title: 'Always set labels on inputs in forms',
    description:
      'Most input elements, as well as the select and textarea elements, need an associated label element that states their purpose. The only exception is those that produce a button, like the reset and submit buttons do. Others, be it text, checkbox, password, radio (button), search etc. require a label element to be present. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice:
      score > 0
        ? 'There are ' +
          score / 10 +
          ' input(s) that are missing labels on a form.'
        : '',
    score: Math.max(0, 100 - score),
    weight: 3,
    offending: offending,
    tags: ['accessibility', 'form']
  };
})();
