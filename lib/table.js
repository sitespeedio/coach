'use strict';

var Table = require('cli-table2'),
  chalk = require('chalk'),
  EOL = require("os").EOL;

function getNewTable() {
  return new Table({
    'style': {
      'head': ['blue'],
      'border': ['white']
    },
    colWidths: [20, 60, 10]
  });
}

function getColoredMessage(score, message) {
  let color = chalk.green;
  if (score >= 80 && score < 95) color = chalk.yellow;
  else if (score < 80) color = chalk.red;
  return color(message ? message : score);
}

function getValue(value) {
  return (typeof value === 'object') ? JSON.stringify(value, null, ' ') : value;
}


class ResultTable {
  constructor(result, options) {
    this.result = result;
    this.options = options;
  }

  setupAdviceTable(type) {
    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': chalk.inverse(type + ' advice')
    }]);

    let adviceList = this.result.coachAdvice.results[type].adviceList;
    let self = this;
    Object.keys(adviceList).forEach(function(advice) {
      let score = adviceList[advice].score;
      if (score < self.options.limit) {
        self.table.push([getColoredMessage(score, advice), adviceList[advice].advice.replace(/(.{57})/g, "$1" + EOL), getColoredMessage(score)]);
      }
    });
  }

  setupDefault() {
    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': chalk.inverse('The coach: Clear Eyes. Full Hearts. Can’t Lose.')
    }]);

    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': chalk.inverse(this.result.coachAdvice.url)
    }]);

    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': this.options.browser + ' version'
    }]);
  }

  setupInfo() {
    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': chalk.inverse('INFORMATION')
    }]);
    let self = this;
    Object.keys(this.result.coachAdvice.results.info).forEach(function(key) {
      self.table.push([key, {
        'colSpan': 2,
        'content': getValue(self.result.coachAdvice.results.info[key])
      }]);
    });
  }

  setupTimings() {
    let self = this;
    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': chalk.inverse('TIMINGS')
    }]);
    Object.keys(self.result.coachAdvice.results.timings).forEach(function(timing) {
      self.table.push([timing, {
        'colSpan': 2,
        'content': getValue(self.result.coachAdvice.results.timings[timing])
      }]);
    });
  }

  setupScoreTable() {
    this.table.push([{
      'colSpan': 3,
      'hAlign': 'center',
      'content': chalk.inverse('Score per type')
    }]);
    this.table.push(['Advice', {
      'colSpan': 2,
      'content': 'Score'
    }]);
    this.table.push(
      ['Performance', {
        'colSpan': 2,
        'content': getColoredMessage(this.result.coachAdvice.results.performance.score)
      }], ['Best practice', {
        'colSpan': 2,
        'content': getColoredMessage(this.result.coachAdvice.results.bestpractice.score)
      }], ['Accessibility', {
        'colSpan': 2,
        'content': getColoredMessage(this.result.coachAdvice.results.accessibility.score)
      }], ['Average', {
        'colSpan': 2,
        'content': getColoredMessage(this.result.coachAdvice.results.score)
      }]
    );
  }

  generate() {
    this.table = getNewTable();
    this.setupDefault();
    this.setupInfo();
    this.setupTimings();
    this.setupAdviceTable('bestpractice');
    this.setupAdviceTable('accessibility');
    this.setupAdviceTable('performance');
    this.setupScoreTable();
    return this.table.toString();
  }

}

module.exports = ResultTable;
