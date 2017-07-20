(function() {
  'use strict';

  var landmarks = ['article', 'aside', 'footer', 'header', 'nav', 'main'];
  var totalLandmarks = 0;

  landmarks.forEach(function(landmark) {
    totalLandmarks += Array.prototype.slice.call(
      window.document.getElementsByTagName(landmark)
    ).length;
  });

  return {
    id: 'landmarks',
    title: 'Structure your content by using landmarks',
    description:
      'Landmarks can be article, aside, footer, header, nav or main tag. Adding such landmarks appropriately can help further provide sense to your document and help users more easily navigate it. https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: totalLandmarks === 0 ? "The page doesn't use any landmarks." : '',
    score: totalLandmarks > 0 ? 100 : 0,
    weight: 5,
    offending: [],
    tags: ['accessibility', 'html']
  };
})();
