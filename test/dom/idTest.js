'use strict';
const Promise = require('bluebird'),
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

Promise.promisifyAll(fs);

describe('Verify advice IDs', function() {
  it('should have an ID that matches the file name', function() {
    const domAdviceDir = path.join(__dirname, '..', '..', 'lib', 'dom');
    const adviceCategoriesWithIds = ['accessibility', 'bestpractice', 'performance'];
    return fs.readdirAsync(domAdviceDir)
      .filter((filename) => fs.statAsync(path.join(domAdviceDir, filename))
        .then((stat) => stat.isDirectory()))
      .filter((dirname) => adviceCategoriesWithIds.indexOf(dirname) !== -1)
      .each((dirname) => {
        return fs.readdirAsync(path.join(domAdviceDir, dirname))
          .filter((filename) => filename.endsWith('.js'))
          .each((filename) => {
            const name = filename.slice(0, -3);

            return fs.readFileAsync(path.join(domAdviceDir, dirname, filename), 'utf8')
              .then((contents) => {
                const id = contents.match(/id: '([^\']*)',/)[1];
                assert(id === name, 'Mismatch of id/filename for ' + filename);
              })
          })
      })
  });
});
