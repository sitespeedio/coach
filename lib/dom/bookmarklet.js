'use strict';
let path = require('path'),
  fs = require('fs');

module.exports = function(filename) {

    let coachSrc = fs.readFileSync(path.join(__dirname, '../../dist/','coach.js'));

    const combinedSrc = `(function() {
      var result = ${coachSrc}
      var score = result.score;
      delete result.score;

      var keys = Object.keys(result).sort();

      keys.forEach(function(key) {
        if (result[key].adviceList) {
          console.log('%c%s %c(%i/100)', 'font-weight: bold', key, 'font-weight: normal', result[key].score);
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

      console.log('%cScore: %i/100', 'font-weight: bold', score);
  })();
`;

    fs.writeFileSync(filename, combinedSrc);
};
