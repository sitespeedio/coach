#!/usr/bin/env node

'use strict';

let stringify = require('json-stable-stringify'),
  cli = require('../lib/cli');


let options = cli.getOptions();

if (options.url) {
  cli.runDOMAndHar(options).then((result) => {
    console.log(stringify(result, {
      space: 2
    }));
    process.exit(0);
  }).catch((e) => {
    console.error('Error running advice: ', e);
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
