/**
 * The sitespeed.io coach (https://www.sitespeed.io/coach)
 * Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';
let path = require('path'),
  fs = require('fs'),
  filter = require('filter-files');

module.exports = function(filename) {

    const filterJsFiles = (file) => (path.extname(file) === '.js');
    const filterDirs = (file, dir) => (fs.statSync(path.resolve(dir, file)).isDirectory());
    const fileContentsByName = (scripts, file) => {
      let name = path.basename(file, '.js');
      scripts[name] = fs.readFileSync(file, 'utf8');
      return scripts;
    };

    let utilsSrc = fs.readFileSync(path.join(__dirname, 'util.js'));
    let calculateScoreSrc = fs.readFileSync(path.join(__dirname, 'calculateScore.js'));

    let categoryDirs = filter.sync(__dirname, filterDirs, false);

    let scriptsByCategory = categoryDirs.reduce((byCategory, categoryDir) => {
      let categoryName = path.basename(categoryDir);
      byCategory[categoryName] = filter.sync(categoryDir, filterJsFiles, false)
        .reduce(fileContentsByName, {});
      return byCategory;
    }, {});

    var pushResultsSrc = Object.keys(scriptsByCategory).map((categoryId) => {
      let scriptsById = scriptsByCategory[categoryId];
      let pushResultsSrc = Object.keys(scriptsById).map((scriptId) => {
        let script = scriptsById[scriptId];
        // catch errors and just add the string, good for finding errors for now
        return `try {${categoryId}Results["${scriptId}"] = ${script}} catch(err) {${categoryId}Results["${scriptId}"] = 'failure:' + err}`;

      }).join('\n');

      // info got some special treatment since it is not an advice
      // more just some intresting info
      let categoryResults = '';
      if (categoryId === 'info' || categoryId === 'timings') {
        categoryResults  = `results["${categoryId}"] = ${categoryId}Results;`;
      }
      else {
        categoryResults  =
        `results["${categoryId}"] = {};
        results["${categoryId}"].adviceList = ${categoryId}Results;`
      }

      return `
  var ${categoryId}Results = {};

  ${pushResultsSrc}

  ${categoryResults}

  `;
    }).join('\n');

    const combinedSrc = `(function() {
if (typeof window !== 'undefined') {
  ${utilsSrc}
  return (function(util) {
      var results = {};
      ${pushResultsSrc}

      ${calculateScoreSrc}

      return results;
    })(util);
  } else {
    console.error('Missing window or window document');
  }
  })();
`;

    fs.writeFileSync(filename, combinedSrc);
};
