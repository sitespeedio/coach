'use strict';
let path = require('path'),
  fs = require('fs'),
  packageInfo = require('../../package'),
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
      let pushResultsSrc = Object.keys(scriptsById).map((scriptId) =>
        `try {
            ${categoryId}Results["${scriptId}"] = ${scriptsById[scriptId]}
          } catch(err) {
            ${categoryId}Errors["${scriptId}"] = err.message;
          }`)
        .join('\n');

      // info got some special treatment since it is not an advice
      // just some interesting info
      let categoryResults;
      if (categoryId === 'info' || categoryId === 'timings') {
        categoryResults = `advice["${categoryId}"] = ${categoryId}Results;`;
      } else {
        categoryResults =
          `advice["${categoryId}"] = {
            'adviceList': ${categoryId}Results
          };`;
      }

      categoryResults += `
      if (Object.keys(${categoryId}Errors).length > 0) {
        errors["${categoryId}"] = ${categoryId}Errors;
      }`;

      return `
  var ${categoryId}Results = {},
      ${categoryId}Errors = {};

  ${pushResultsSrc}

  ${categoryResults}

  `;
    }).join('\n');

    const combinedSrc =
`(function() {
  if (typeof window !== 'undefined') {
    ${utilsSrc}
    return (function(util) {
        var advice = {},
            errors = {};
            
        ${pushResultsSrc}
  
        ${calculateScoreSrc}
                  
        return {
          'advice': advice,
          'errors': errors,
          'url': document.URL,
          'version': "${packageInfo.version}"
        };
      })(util);
    } else {
      console.error('Missing window or window document');
    }
  })();
`;

    fs.writeFileSync(filename, combinedSrc);
};
