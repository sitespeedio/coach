(function() {
  'use strict';

  var versions = [];
  // check that we got a jQuery
  if (typeof window.jQuery === 'function') {
    versions.push(window.jQuery.fn.jquery);
    var old = window.jQuery;
    while (old.fn && old.fn.jquery) {
      old = window.jQuery.noConflict(true);
      if (!window.jQuery || !window.jQuery.fn) {
        break;
      }
      if (old.fn.jquery === window.jQuery.fn.jquery) {
        break;
      }
      versions.push(window.jQuery.fn.jquery);
    }
  }

  // TODO also add check for jQuery version. If we have a really old version (1 year old?) then show it!

  return {
    id: 'jquery',
    title: 'Avoid using more than one jQuery version per page',
    description:
      "There are sites out there that use multiple versions of jQuery on the same page. You shouldn't do that because the user will then unnecessarily download extra data. Cleanup the code and make sure you only use one version.",
    advice:
      versions.length > 1
        ? 'The page uses ' +
          versions.length +
          ' versions of jQuery! You only need one version, please remove the unnecessary version(s).'
        : '',
    score: versions.length > 1 ? 0 : 100,
    weight: 4,
    offending: versions,
    tags: ['jQuery', 'performance']
  };
})();
