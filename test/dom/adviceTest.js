'use strict';
let bt = require('../help/browsertimeSingleScript');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let urlPath = 'http://0.0.0.0:8282/combined/';

// we only need to test this for one browser
let BROWSERS = ['chrome'];

let KEYS = ['id', 'title', 'description', 'advice', 'score', 'weight', 'offending', 'tags'];

let ADVICE_CATEGORIES = ['accessibility', 'bestpractice', 'performance'];

describe('Verify advice structure ', function() {

  BROWSERS.forEach(function(browser) {
    describe('browser:' + browser, function() {

      ADVICE_CATEGORIES.forEach(function(category) {
        describe('category:' + category, function() {


          let files = fs.readdirSync('lib/dom/' + category + '/');

          this.timeout(15000);

          before(() => bt.start(browser));

          after(() => bt.stop());
          files.forEach(function(filename) {
            {
              if (path.extname(filename) === '.js') {
                it('We should return the keys for ' + filename, function() {
                  return bt.run(urlPath + 'index.html', 'lib/dom/' + category + '/' + filename)
                    .then((result) => {
                      KEYS.forEach(function(key) {
                        assert.strictEqual(result.hasOwnProperty(key), true, 'The ' + filename + ' advice is missing the ' + key + ' key');
                      });
                      // verify that we don't return to many keys in the advice
                      assert.strictEqual(Object.keys(result).length, KEYS.length, 'The ' + filename + ' advice doesn\'t return  the right number of keys');
                    });
                });
              }
            }
          });
        });
      });
    });
  });
});
