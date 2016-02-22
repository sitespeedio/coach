'use strict';
let assert = require('assert');
let util = require('../../lib/har/util');


describe('Test HAR util functions', function() {

  it('Categorize connection types H2 as HTTP/2 and nothing else', function() {
    let page = {};
    page.connectionType = 'h2';
    assert.strictEqual(util.isHttp2(page), true);
    page.connectionType = 'spdy';
    assert.strictEqual(util.isHttp2(page), false);
    page.connectionType = 'h1';
    assert.strictEqual(util.isHttp2(page), false);
  });

  it('Get the right hostname', function() {
    let url = 'https://www.sitespeed.io/hepp.php';
    assert.strictEqual(util.getHostname(url), 'www.sitespeed.io');

    url = 'https://www.sitespeed.io:8080/hepp.php';
    assert.strictEqual(util.getHostname(url), 'www.sitespeed.io');

    url = 'https://sitespeed.io';
    assert.strictEqual(util.getHostname(url), 'sitespeed.io');

  });

});
