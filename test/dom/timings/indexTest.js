'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/timings/';

let BROWSERS = ['chrome', 'firefox'];

describe('Timings:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(60000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should get a RUMSpeedIndex', function() {
        return bt.run(path + 'index.html', 'lib/dom/timings/rumSpeedIndex.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should get a Navigation Timings', function() {
        return bt.run(path + 'index.html', 'lib/dom/timings/navigationTimings.js')
          .then((result) => {
            assert.strictEqual(result.loadEventEnd > 0, true);
          });
      });

      it('We should get our calculated timings', function() {
        return bt.run(path + 'index.html', 'lib/dom/timings/timings.js')
          .then((result) => {
            assert.strictEqual(result.frontEndTime > 0, true);
          });
      });

      it('We should get User Timing Marks', function() {
        return bt.run(path + 'index.html', 'lib/dom/timings/userTimings.js')
          .then((result) => {
            assert.strictEqual(result.marks.santaLoaded > 0, true);
          });
      });

      it('We should get User Timing measurements', function() {
        return bt.run(path + 'index.html', 'lib/dom/timings/userTimings.js')
          .then((result) => {
            assert.strictEqual(result.measures.time.startTime > 0, true);
          });
      });

      it('We should get a fully loaded timing', function() {
        return bt.run(path + 'index.html', 'lib/dom/timings/fullyLoaded.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

    });
  });

});
