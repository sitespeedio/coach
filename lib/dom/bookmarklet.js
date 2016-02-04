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
          console.log('%c%s %c(%i)', 'font-weight: bold', key, 'font-weight: normal', result[key].score);
          console.table(result[key].adviceList, ['score','advice']);
        }
        else {
          console.log('%c%s', 'font-weight: bold', key);
          if (typeof result[key] === 'object')
              console.log('%O', result[key]);
          else
              console.log(result[key]);
        }
      });
  })();
`;

    fs.writeFileSync(filename, combinedSrc);
};
