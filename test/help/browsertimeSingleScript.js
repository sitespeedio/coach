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
    let util = fs.readFileSync(path.resolve('lib/dom/util.js'), 'utf8');
    let script = fs.readFileSync(path.resolve(scriptPath), 'utf8');
    if (script.indexOf('(function(util)') === -1) {
        script = script.replace('(function() {', 'return (function() {');
    } else {
        script = script.replace('(function(util) {', 'return (function(util) {');
    }
    return runner.loadAndWait(url, 'return window.performance.timing.loadEventEnd>0')
      .then(() => runner.runScript(util + script));
  }
};
