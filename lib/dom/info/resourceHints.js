(function(util) {
  'use strict';
  return {
    'dns-prefetch': util.getResourceHintsHrefs('dns-prefetch'),
    preconnect: util.getResourceHintsHrefs('preconnect'),
    prefetch: util.getResourceHintsHrefs('prefetch'),
    prerender: util.getResourceHintsHrefs('prerender')
  };
})(util);
