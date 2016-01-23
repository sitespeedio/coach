'use strict';

let bt = require('browsertime'),
  fs = require('fs'),
  path = require('path');

let runner;

module.exports = {
  start: function(browser) {
    bt.logging.configure({});
    runner = new bt.SeleniumRunner({
      browser: browser
    });
    return runner.start();
  },
  stop: function() {
    return runner.stop();
  },
  run: function(url, scriptPath) {
    let script = fs.readFileSync(path.resolve(scriptPath), 'utf8');
    return runner.loadAndWait(url)
      .then(() => runner.runScript('return ' + script));
  }
};
