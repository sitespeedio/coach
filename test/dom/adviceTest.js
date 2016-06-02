'use strict';
const createTestRunner = require('../help/browsertimeRunner').createTestRunner,
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

let ADVICE_CATEGORIES = ['accessibility', 'bestpractice', 'performance'];

function assertKeys(result, filename) {
  const KEYS = ['id', 'title', 'description', 'advice', 'score', 'weight', 'offending', 'tags'];

  KEYS.forEach(function(key) {
    assert.strictEqual(result.hasOwnProperty(key), true, 'The ' + filename + ' advice is missing the ' + key + ' key');
  });
  // verify that we don't return to many keys in the advice
  assert.strictEqual(Object.keys(result).length, KEYS.length, 'The ' + filename + ' advice doesn\'t return  the right number of keys');
}

describe('Verify advice structure', function() {
  this.timeout(60000);

  ADVICE_CATEGORIES.forEach(function(category) {
    describe('category: ' + category, function() {
      // we only need to test this for one browser
      const runner = createTestRunner('chrome', category);

      let files = fs.readdirSync('lib/dom/' + category + '/');

      before(() => runner.start());

      after(() => runner.stop());

      files.forEach(function(filename) {
        {
          if (path.extname(filename) === '.js') {
            it('We should return the keys for ' + filename, function() {
              return runner.run(filename)
                .then((result) => assertKeys(result, filename));
            });
          }
        }
      });
    });
  });
});
