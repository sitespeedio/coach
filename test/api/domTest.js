'use strict';

const api = require('../../lib/'),
  chai = require("chai"),
  chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const LOCAL_SERVER = 'http://0.0.0.0:8282/info/head.html';

const BROWSERS = ['chrome', 'firefox'];

describe('DOM apis:', function() {

  describe('getDomAdvice', function() {
    it('should return a script', function() {
      return api.getDomAdvice().should.eventually.not.be.empty;
    });

  });

  BROWSERS.forEach(function(browser) {

    describe('runDomAdvice: ' + browser, function() {
      this.timeout(60000);

      it('should run simple script', () =>
        api.runDomAdvice(LOCAL_SERVER, api.getDomAdvice(), {
          browser,
          iterations: 1,
          pageCompleteCheck: 'return window.performance.timing.loadEventEnd>0'
          // TODO test that we actually have DOM data and valid HAR
        }).should.eventually.have.deep.property('results.info.amp')
      );
    });
  });
});
