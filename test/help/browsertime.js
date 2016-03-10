'use strict';

let bt = require('browsertime'),
  fs = require('fs'),
  path = require('path');

let runner;

module.exports = {
  start: function(browser) {
    bt.logging.configure({});
    runner = new bt.SeleniumRunner({
      browser: browser,
      'timeouts': {
        'browserStart': 30000
      }
    });
    return runner.start();
  },
  stop: function() {
    return runner.stop();
  },
  run: function(url, scriptPath) {
    let script = fs.readFileSync(path.resolve(scriptPath), 'utf8');
    return runner.loadAndWait(url,'return window.performance.timing.loadEventEnd>0')
      .then(() => runner.runScript('return ' + script));
  }
};
