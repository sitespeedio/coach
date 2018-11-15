'use strict';
module.exports = {
  id: 'cpuTimeSpentInRendering',
  title: 'Avoid spend too much CPU time to render the page',
  description:
    'You need to be able to render the page fast. This metric depends on which computer/device you run on but the limit here is high: Spending more time than 500 ms will alert this advice.',
  weight: 7,
  tags: ['performance', 'CSS'],
  processPage: function(page) {
    if (page.cpu && page.cpu.categories) {
      // 500 ms limit, it's high!
      const limit = 500;
      if (page.cpu.categories.Rendering >= limit) {
        const offending = [];
        for (let name of Object.keys(page.cpu.events)) {
          offending.push(name + ':' + page.cpu.events[name] + ' ms');
        }
        return {
          score: 0,
          offending: offending,
          advice:
            'The page spent ' +
            page.cpu.categories.Rendering +
            ' ms rendering the page, that is too much.'
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
