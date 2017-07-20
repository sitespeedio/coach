(function() {
  'use strict';

  function domDepth(document) {
    var allElems = document.getElementsByTagName('*');
    var allElemsLen = allElems.length;
    var totalParents = 0;
    var maxParents = 0;

    while (allElemsLen--) {
      var parents = numParents(allElems[allElemsLen]);
      if (parents > maxParents) {
        maxParents = parents;
      }
      totalParents += parents;
    }

    var average = totalParents / allElems.length;

    return {
      avg: average,
      max: maxParents
    };
  }

  function numParents(elem) {
    var n = 0;

    if (elem.parentNode) {
      while ((elem = elem.parentNode)) {
        n++;
      }
    }
    return n;
  }

  var depth = domDepth(document);

  return {
    avg: Math.round(depth.avg),
    max: depth.max
  };
})();
