'use strict';
let bt = require('../../help/browsertimeSingleScript');
let assert = require('assert');

let path = 'http://0.0.0.0:8282/bestpractice/';

let BROWSERS = ['chrome', 'firefox'];

describe('Best practice:', function() {

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      this.timeout(60000);

      before(() => bt.start(browser));

      after(() => bt.stop());

      it('We should be able to check the title tag', function() {
        return bt.run(path + 'pageTitle.html', 'lib/dom/bestpractice/pageTitle.js')
          .then((result) => {
            assert.strictEqual(result.score, 50);
          });
      });

      it('We should be able to check if the page is missing a description meta tag', function() {
        return bt.run(path + 'missingMetaDescription.html', 'lib/dom/bestpractice/metaDescription.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to check if the page has a description meta tag', function() {
        return bt.run(path + 'metaDescription.html', 'lib/dom/bestpractice/metaDescription.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should find meta description meta tag in upper case', function() {
        return bt.run(path + 'upperCaseMetaDescription.html', 'lib/dom/bestpractice/metaDescription.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should be able to know if a page is missing the doctype', function() {
        return bt.run(path + 'doctype.html', 'lib/dom/bestpractice/doctype.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to detect the character set of a page', function() {
        return bt.run(path + 'charset.html', 'lib/dom/bestpractice/charset.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should be able to detect if a web page is served using HTTPS', function() {
        return bt.run(path + 'https.html', 'lib/dom/bestpractice/https.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to detect if a web page has set a language', function() {
        return bt.run(path + 'language.html', 'lib/dom/bestpractice/language.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to detect URLs with jsessionid', function() {
        return bt.run(path + 'url.html?jsessionid=ecdeed', 'lib/dom/bestpractice/url.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if we use more than 2 parameters on a page', function() {
        return bt.run(path + 'url.html?jleffe=ecdeed&hepp=hopp&left=right', 'lib/dom/bestpractice/url.js')
          .then((result) => {
            assert.strictEqual(result.score, 50);
          });
      });

      it('We should be able to know if a URL is too long', function() {
        return bt.run(path + 'url.html?long=thisisasuperlongurlthatyoureallyshouldavoidwhenyoucreateanewsitepleasedoitoritwillbreakyou', 'lib/dom/bestpractice/url.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to know if a URL contains spaces', function() {
        return bt.run(path + 'url.html?left=right%20hepp', 'lib/dom/bestpractice/url.js')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

    });
  });

});
