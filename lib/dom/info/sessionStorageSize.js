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
  return storageSize(window.sessionStorage);
})();
