'use strict';
let path = require('path'),
  fs = require('fs');

module.exports = function(filename) {

    let coachSrc = fs.readFileSync(path.join(__dirname, '../../dist/','coach.js'));

    const combinedSrc = `(function() {
      var result = ${coachSrc}
      var score = result.results.score;
      delete result.results.score;

      var keys = Object.keys(result.results).sort();

      keys.forEach(function(key) {
        if (result.results[key].adviceList) {
          console.log('%c%s %c(%i/100)', 'font-weight: bold', key, 'font-weight: normal', result.results[key].score);
          console.table(result.results[key].adviceList, ['score','advice']);
        }
        else {
          console.log('%c%s', 'font-weight: bold', key);
          if (typeof result.results[key] === 'object')
              console.log('%O', result.results[key]);
          else
              console.log(result.results[key]);
        }
      });

      console.log('%cScore: %i/100', 'font-weight: bold', score);
  })();
`;

    fs.writeFileSync(filename, combinedSrc);
};
