'use strict';

const api = require('../../lib/'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  assert = require('assert');

Promise.promisifyAll(fs);

describe('pickAPage HAR api:', function() {
  const harPath = path.join(__dirname, '..', 'har', 'files', 'www.nytimes.com.har');

  it('should work', () =>
    fs.readFileAsync(harPath, 'utf8').then(JSON.parse).then((har) =>
      assert.strictEqual(api.pickAPage(har, 0).log.pages.length, 1)));
});
