'use strict';
const cli = require('../../lib/cli'),
  assert = require('assert');

let path = 'http://0.0.0.0:8282/timings/';

let resultStructure = {
coachAdvice:
   { results:
      { accessibility: [Object],
        bestpractice: [Object],
        info: [Object],
        performance: [Object],
        timings: [Object],
        score: 94 },
     errors: {},
     url: 'https://www.sitespeed.io/',
     version: '0.2.0' }
   };

describe('Cli', function() {
   this.timeout(15000);
  it('The result should have the right structure  ', function() {
    const options = {url:'https://www.sitespeed.io', browser: 'firefox'};

    return cli.runDOMAndHar(options).then((result) =>
    {
        console.log(result);
        assert.strictEqual(Object.keys(result).length,1)
        assert.strictEqual(Object.keys(result.coachAdvice).length, 4);
        assert.strictEqual(Object.keys(result.coachAdvice.results).length, 6, 'The results should have six children: accessibility, bestpractice, info, performance, timings & score');
    });
  });
});
