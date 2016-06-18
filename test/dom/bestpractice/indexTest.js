'use strict';

const createTestRunner = require('../../help/browsertimeRunner').createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Best practice', function() {
  this.timeout(60000);

  BROWSERS.forEach(function(browser) {

    describe('browser: ' + browser, function() {

      const runner = createTestRunner(browser, 'bestpractice');

      before(() => runner.start(browser));

      after(() => runner.stop());

      it('We should be able to check the title tag', function() {
        return runner.run('pageTitle.js')
          .then((result) => {
            assert.strictEqual(result.score, 50);
          });
      });

      it('We should be able to check if the page is missing a description meta tag', function() {
        return runner.run('metaDescription.js', 'missingMetaDescription.html')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to check if the page has a description meta tag', function() {
        return runner.run('metaDescription.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should find meta description meta tag in upper case', function() {
        return runner.run('metaDescription.js', 'upperCaseMetaDescription.html')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should be able to know if a page is missing the doctype', function() {
        return runner.run('doctype.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if a page is using a non-HTML5 doctype', function() {
        return runner.run('doctype.js', 'doctype4.html')
          .then((result) => {
            assert.strictEqual(result.score, 25);
          });
      });

      it('We should be able to know if a page is using the HTML5 doctype', function() {
        return runner.run('doctype.js', 'doctype5.html')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should be able to detect the character set of a page', function() {
        return runner.run('charset.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

      it('We should be able to detect if a web page is served using HTTPS', function() {
        return runner.run('https.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to detect if a web page has set a language', function() {
        return runner.run('language.js')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to detect URLs with jsessionid', function() {
        return runner.run('url.js', 'url.html?jsessionid=ecdeed')
          .then((result) => {
            assert.strictEqual(result.score, 0);
          });
      });

      it('We should be able to know if we use more than 2 parameters on a page', function() {
        return runner.run('url.js', 'url.html?jleffe=ecdeed&hepp=hopp&left=right')
          .then((result) => {
            assert.strictEqual(result.score, 50);
          });
      });

      it('We should be able to know if a URL is too long', function() {
        return runner.run('url.js', 'url.html?long=thisisasuperlongurlthatyoureallyshouldavoidwhenyoucreateanewsitepleasedoitoritwillbreakyou')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should be able to know if a URL contains spaces', function() {
        return runner.run('url.js', 'url.html?left=right%20hepp')
          .then((result) => {
            assert.strictEqual(result.score, 90);
          });
      });

      it('We should not hurt pages served by HTTP', function() {
        return runner.run('spdy.js')
          .then((result) => {
            assert.strictEqual(result.score, 100);
          });
      });

    });
  });

});
