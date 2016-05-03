#!/usr/bin/env node

'use strict';

let path = require('path'),
  fs = require('fs');

module.exports = function(sourcePath, destinationPath) {
    const coachSrc = fs.readFileSync(path.resolve(sourcePath));

    const combinedSrc = `(function() {
      var result = ${coachSrc}
      var score = result.advice.score;
      delete result.advice.score;

      var keys = Object.keys(result.advice).sort();

      keys.forEach(function(key) {
        if (result.advice[key].adviceList) {
          console.log('%c%s %c(%i/100)', 'font-weight: bold', key, 'font-weight: normal', result.advice[key].score);
          console.table(result.advice[key].adviceList, ['score','advice']);
        }
        else {
          console.log('%c%s', 'font-weight: bold', key);
          if (typeof result.advice[key] === 'object')
              console.log('%O', result.advice[key]);
          else
              console.log(result.advice[key]);
        }
      });

      console.log('%cScore: %i/100', 'font-weight: bold', score);
  })();
`;

    fs.writeFileSync(path.resolve(destinationPath), combinedSrc, 'utf8');
};

if (!module.parent) {
    if (process.argv.length !== 4) {
        console.error('Must specify sourcePath and destinationPath');
        process.exit(1);
    }
      
    module.exports(process.argv[2], process.argv[3]);
}
