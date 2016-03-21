'use strict';
const cli = require('../../lib/cli'),
  assert = require('assert');

let path = 'http://0.0.0.0:8282/timings/';

describe('Cli', function() {
   this.timeout(15000);
  it('The merged result should have the right structure from runDomAndHar ', function() {
    const options = {_:[path], browser: 'firefox'};

    return cli.runDOMAndHar(options).then((result) =>
    {
      /* The current structure looks like this:
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
      */

        assert.strictEqual(Object.keys(result).length,1)
        assert.strictEqual(Object.keys(result.coachAdvice).length, 4);
        assert.strictEqual(Object.keys(result.coachAdvice.results).length, 6, 'The results should have six children: accessibility, bestpractice, info, performance, timings & score');
    });
  });

  it('The  result should have the right structure from runHAR ', function() {
    const options = {_:['test/har/files/assetsRedirects.har'] };

    return cli.runHAR(options).then((result) =>
    {
      /* The current structure looks like this:
      coachAdvice:
         { results:
            { performance: [Object] }
           version: '0.2.0' }
      */

        assert.strictEqual(Object.keys(result[0]).length,1)
        assert.strictEqual(Object.keys(result[0].coachAdvice).length, 2);
        assert.strictEqual(Object.keys(result[0].coachAdvice.results).length, 1, 'The results should have six children: accessibility, bestpractice, info, performance, timings & score');
    });
  });
});
