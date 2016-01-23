/**
 * @fileoverview Always set labels on input in forms.
 * @namespace advice/accessibility
 * @author Peter Hedenskog, Tobias Lidskog
 * @Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog and other contributors.
 * Released under the Apache 2.0 License.
 */
(function() {
  'use strict';

  function getMatchingLabel(id, labels) {
    return labels.filter(function(entry) {
      return (entry.for && entry.for === id);
    });
  }

  var labels = Array.prototype.slice.call(window.document.getElementsByTagName('label'));

  var score = 0;
  var offending = [];
  var inputs = Array.prototype.slice.call(window.document.getElementsByTagName('input'));
  inputs.forEach(function(input) {
    if (input.type === 'text' || input.type === 'password' || input.type === 'radio' || input.type === 'checkbox' || input.type === 'search') {

      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
      if (input.parentElement.nodeName != 'LABEL' && (input.id && getMatchingLabel(input.id, labels).length === 0)) {
        score += 10;
      }
    }
  });
  return {
    id: 'labelOnInput',
    title: 'Always set labels on input in forms',
    description: 'Most input elements, as well as the select and textarea elements, need an associated label element that states the purpose. The one exception are those that produce a button, like the types of button, reset, and submit do. But every other, be it text, checkbox, password, radio (button), search etc. require a label element to be present. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: score > 0 ? 'There are input that misses labels on your forms.' : '',
    score: 100 - score < 0 ? 0 : 100 - score,
    weight: 3,
    offending: offending,
    tags: ['accessibility', 'form']
  };

})();
