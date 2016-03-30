'use strict';
let path = require('path'),
  fs = require('fs');

module.exports = function(filename) {

    let coachSrc = fs.readFileSync(path.join(__dirname, '../../dist/','coach.js'));

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

    fs.writeFileSync(filename, combinedSrc);
};
