#!/usr/bin/env node

'use strict';

let stringify = require('json-stable-stringify'),
  ResultTable = require('../lib/table'),
  cli = require('../lib/cli');


let options = cli.getOptions();

if (options.url) {
  cli.runDOMAndHar(options).then((result) => {

    if (options.output === 'json') {
      console.log(stringify(result, {
        space: 2
    }));
  } else {

    let table = new ResultTable(result, options);
    console.log(table.generate());
  }

    process.exit(0);
  }).catch((e) => {
    console.error('Error running advice: ', e.stack);
    process.exit(1);
  });
} else if (options.file) {
  cli.runHAR(options).then((results) => {
    console.log(stringify(results, {
      space: 2
    }));
    process.exit(0);
  }).catch((e) => {
    console.error('Error running advice for har', e);
    process.exit(1);
  });
}
