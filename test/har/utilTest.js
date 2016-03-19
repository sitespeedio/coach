'use strict';
let assert = require('assert');
let util = require('../../lib/har/util');


describe('Test HAR util functions', function() {

  it('Categorize connection types H2/SPDY as HTTP/2 and nothing else', function() {
    let page = {};
    page.httpType = 'h2';
    assert.strictEqual(util.isHTTP2(page), true);
    page.httpType = 'spdy';
    assert.strictEqual(util.isHTTP2(page), true);
    page.httpType = 'h1';
    assert.strictEqual(util.isHTTP2(page), false);
  });

  it('Get the right hostname', function() {
    let url = 'https://www.sitespeed.io/hepp.php';
    assert.strictEqual(util.getHostname(url), 'www.sitespeed.io');

    url = 'https://www.sitespeed.io:8080/hepp.php';
    assert.strictEqual(util.getHostname(url), 'www.sitespeed.io');

    url = 'https://sitespeed.io';
    assert.strictEqual(util.getHostname(url), 'sitespeed.io');

  });

  it('Format bytes for readability', function() {
    let bytes = 1200000;
    assert.strictEqual(util.formatBytes(bytes), '1.2 MB');

    bytes = 120000;
    assert.strictEqual(util.formatBytes(bytes), '120 kB');
    });

});
