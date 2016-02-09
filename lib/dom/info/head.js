(function(util) {
  'use strict';
  /*
    Get requests inside of head that will influence the start render
  */
  return {
    jssync: util.getSynchJSFiles(document.head),
    jsasync: util.getAsynchJSFiles(document.head),
    css: util.getCSSFiles(document.head)
  };
})(util);
