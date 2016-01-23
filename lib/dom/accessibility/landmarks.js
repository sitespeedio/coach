/**
 * @fileoverview Structure your content by using landmarks
 * @namespace advice/accessibility
 * @author Peter Hedenskog, Tobias Lidskog
 * @Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog and other contributors.
 * Released under the Apache 2.0 License.
 */
(function() {
  'use strict';

  var landmarks = ['article','aside','footer','header','nav','main'];
  var totalLandmarks = 0;
  landmarks.forEach(function(landmark) {
      totalLandmarks += Array.prototype.slice.call(window.document.getElementsByTagName(landmark)).length;
  });

  return {
    id: 'landmarks',
    title: 'Structure your content by using landmarks',
    description: 'Landmarks can be article, aside, footer, header, nav or main tag. Adding such landmarks appropriately can help further provide sense to your document and help users more easily navigate it. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: totalLandmarks === 0 ? 'You don\'t use any landmarks on your page.' : '',
    score:  totalLandmarks > 0 ? 100 : 0,
    weight: 5,
    offending: [],
    tags: ['accessibility','html']
  };

})();
