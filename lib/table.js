'use strict';

var wrap = require('word-wrap');

var Table = require('cli-table3'),
  sortBy = require('lodash.sortby'),
  chalk = require('chalk');

function getNewTable() {
  return new Table({
    style: {
      head: ['blue'],
      border: ['white']
    },
    colWidths: [25, 55, 10]
  });
}

function getColoredMessage(score, message) {
  let color = chalk.green;
  if (score >= 80 && score < 95) {
    color = chalk.yellow;
  } else if (score < 80) {
    color = chalk.red;
  }
  return color(message ? message : score);
}

function getValue(value) {
  return typeof value === 'object' ? JSON.stringify(value, null, ' ') : value;
}

class ResultTable {
  constructor(result, options) {
    this.result = result;
    this.options = options;
  }

  setupAdviceTable(type) {
    if (this.options.noColor) {
      chalk.enabled = false;
    }

    let names = {
      performance: 'Performance advice',
      accessibility: 'Accessibility advice',
      bestpractice: 'Best practice advice '
    };

    this.table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: chalk.inverse(names[type])
      }
    ]);

    let adviceList = this.result.advice[type].adviceList;
    let self = this;

    let sortedAdvice = sortBy(adviceList, this.options.sortBy);

    sortedAdvice.forEach(advice => {
      let score = advice.score;
      if (score < self.options.limit) {
        self.table.push([
          getColoredMessage(score, advice.id),
          wrap(advice.advice, {
            trim: true,
            indent: '',
            width: 53
          }),
          getColoredMessage(score)
        ]);

        if (self.options.description) {
          self.table.push([
            'Description',
            {
              colSpan: 2,
              content: wrap(advice.title + '. ' + advice.description, {
                trim: true,
                indent: '',
                width: 63
              })
            }
          ]);
        }

        // show offending if it's configured and we have some assets
        if (advice.offending.length > 0 && self.options.details) {
          self.table.push([
            {
              colSpan: 3,
              content: advice.offending.join('\n')
            }
          ]);
        }
      }
    });
  }

  setupDefault() {
    this.table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: chalk.inverse(
          'The coach: Clear Eyes. Full Hearts. Can’t Lose. Version ' +
            this.result.version
        )
      }
    ]);

    this.table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: chalk.inverse(this.result.url)
      }
    ]);

    this.table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: this.result.advice.info.browser
      }
    ]);
  }

  setupInfo() {
    const table = this.table,
      advice = this.result.advice;

    table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: chalk.inverse('INFORMATION')
      }
    ]);
    Object.keys(advice.info).forEach(key => {
      table.push([
        key,
        {
          colSpan: 2,
          content: getValue(advice.info[key])
        }
      ]);
    });
  }

  setupTimings() {
    const table = this.table,
      advice = this.result.advice;

    table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: chalk.inverse('TIMINGS')
      }
    ]);
    Object.keys(advice.timings).forEach(timing => {
      table.push([
        timing,
        {
          colSpan: 2,
          content: getValue(advice.timings[timing])
        }
      ]);
    });
  }

  setupScoreTable() {
    const table = this.table,
      advice = this.result.advice;

    table.push([
      {
        colSpan: 3,
        hAlign: 'center',
        content: chalk.inverse('Score per type')
      }
    ]);
    table.push([
      'Advice',
      {
        colSpan: 2,
        content: 'Score'
      }
    ]);
    table.push(
      [
        'Performance',
        {
          colSpan: 2,
          content: getColoredMessage(advice.performance.score)
        }
      ],
      [
        'Best practice',
        {
          colSpan: 2,
          content: getColoredMessage(advice.bestpractice.score)
        }
      ],
      [
        'Accessibility',
        {
          colSpan: 2,
          content: getColoredMessage(advice.accessibility.score)
        }
      ],
      [
        'Total average',
        {
          colSpan: 2,
          content: getColoredMessage(advice.score)
        }
      ]
    );
  }

  generate() {
    this.table = getNewTable();
    if (this.options._[0].startsWith('http')) {
      this.setupDefault();
      this.setupInfo();
      this.setupTimings();
      this.setupAdviceTable('bestpractice');
      this.setupAdviceTable('accessibility');
    }
    this.setupAdviceTable('performance');
    if (this.options._[0].startsWith('http')) {
      this.setupScoreTable();
    }
    return this.table.toString();
  }
}

module.exports = ResultTable;
