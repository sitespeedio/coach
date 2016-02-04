/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';
let path = require('path'),
  fs = require('fs');

module.exports = function(filename) {

    let coachSrc = fs.readFileSync(path.join(__dirname, '../../dist/','coach.js'));

    const combinedSrc = `(function() {
      var result = ${coachSrc}
      Object.keys(result).forEach(function(key) {
        if (result[key].adviceList) {
          console.log(key);
          console.table(result[key].adviceList, ['score','advice']);
        }
        else {
          console.log(key + ': ' + JSON.stringify(result[key], null, 2));
        }
      });
  })();
`;

    fs.writeFileSync(filename, combinedSrc);
};
