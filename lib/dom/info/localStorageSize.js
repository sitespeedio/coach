(function() {
  'use strict';

  function storageSize(storage) {
    // if local storage is disabled
    if (storage) {
      var keys = storage.length || Object.keys(storage).length;
      var bytes = 0;
      for (var i = 0; i < keys; i++) {
        var key = storage.key(i);
        var val = storage.getItem(key);
        bytes += key.length + val.length;
      }
      return bytes;
    }
    else return 0;
  }
  return storageSize(window.localStorage);
})();
