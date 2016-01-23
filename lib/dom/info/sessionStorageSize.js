/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
 (function() {
  'use strict';

  function storageSize(storage) {
    var keys = storage.length || Object.keys(storage).length;
    var bytes = 0;
    for (var i = 0; i < keys ; i++) {
      var key = storage.key(i);
      var val = storage.getItem(key);
      bytes += key.length + val.length;
    }
    return bytes;
  }
  return {
    sessionStorageSize: storageSize(window.sessionStorage)
  };
})();
