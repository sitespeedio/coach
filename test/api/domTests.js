'use strict';

const api = require('../../'),
  chai = require("chai"),
  chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const LOCAL_SERVER = 'http://0.0.0.0:8282/info/';

const BROWSERS = ['chrome', 'firefox'];

describe('DOM apis:', function() {

  describe('getAdviceScript', function() {
    it('should return a script', function() {
      return api.dom.getAdviceScript().should.eventually.not.be.empty;
    });

  });

  BROWSERS.forEach(function(browser) {

    describe('runAdvice: ' + browser, function() {
      this.timeout(15000);

      it('should run simple script', function() {
        return api.dom.runAdvice(LOCAL_SERVER, {
          browser,
          iterations: 1,
          pageCompleteCheck: 'return window.performance.timing.loadEventEnd>0'
        }).should.eventually.have.property("browsertimeData");
      });
    });
  });
});
