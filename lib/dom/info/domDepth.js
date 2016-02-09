(function() {
  'use strict';

  function domDepth(document) {
    var aElems = document.getElementsByTagName('*');
    var i = aElems.length;
    var totalParents = 0;
    var maxParents = 0;
    while (i--) {
      var parents = numParents(aElems[i]);
      if (parents > maxParents) {
        maxParents = parents;
      }
      totalParents += parents;
    }
    var average = totalParents / aElems.length;
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
