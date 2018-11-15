'use strict';
module.exports = {
  id: 'cpuTimeSpentInScripting',
  title: 'Avoid executing too much JavaScript',
  description:
    'Do not run too much JavaSript, that will slow down the page for your user. This metric depends on which computer/device you run on but the limit here is high: Spending more time than 1000 ms will alert this advice',
  weight: 7,
  tags: ['performance', 'JavaScript'],
  processPage: function(page) {
    if (page.cpu && page.cpu.categories) {
      // 1000 ms limit, it's high!
      const limit = 1000;
      if (page.cpu.categories.Scripting >= limit) {
        const offending = [];
        for (let name of Object.keys(page.cpu.events)) {
          offending.push(name + ':' + page.cpu.events[name] + ' ms');
        }
        return {
          score: 0,
          offending: offending,
          advice:
            'The page spent ' +
            page.cpu.categories.Scripting +
            ' ms in executing JavaScript, that is surely too much.'
        };
      } else {
        return {
          score: 100,
          offending: [],
          advice: ''
        };
      }
    } else {
      return {
        score: 100,
        offending: [],
        advice:
          'We can only get CPU spent time if you use Chrome to test the page.'
      };
    }
  }
};
