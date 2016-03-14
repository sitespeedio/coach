(function() {
  'use strict';
  var versions = [];
  // check that we got an JQuery
  if (typeof window.jQuery == 'function') {
    versions.push(window.jQuery.fn.jquery);
    var old = window.jQuery;
    while (old.fn && old.fn.jquery) {
      old = window.jQuery.noConflict(true);
      if (!window.jQuery) break;
      if (old.fn.jquery === window.jQuery.fn.jquery) {
        break;
      }
      versions.push(window.jQuery.fn.jquery);
    }
  }

  // TODO also add check for JQuery version. If we have a really old version (1 year old?) then show it!

  return {
    id: 'jquery',
    title: 'Avoid use more than one JQuery version per page',
    description: 'You may not think this is true, but there are pages that uses more than one JQuery versions.',
    advice: versions.length > 1 ? 'The page uses ' + versions.length + ' versions of JQuery! You only need at max one, so if please remove the other version(s).'  : '',
    score: versions.length > 1 ? 0 : 100 ,
    weight: 4,
    offending: versions,
    tags: ['JQuery', 'performance']
  };

})();
