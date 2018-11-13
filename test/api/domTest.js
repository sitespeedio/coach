'use strict';

const api = require('../../lib/'),
  urlParser = require('url'),
  webserver = require('../help/webserver'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const BROWSERS = ['chrome', 'firefox'];

describe('DOM APIs:', function() {
  let url;

  before(() =>
    webserver.startServer().then(address => {
      url = urlParser.format({
        protocol: 'http',
        hostname: address.address,
        port: address.port,
        pathname: 'info/head.html'
      });
    })
  );

  after(() => webserver.stopServer());

  describe('getDomAdvice', function() {
    it('should return a script', function() {
      return api.getDomAdvice().should.eventually.not.be.empty;
    });
  });

  BROWSERS.forEach(function(browser) {
    describe('runDomAdvice: ' + browser, async function() {
      this.timeout(60000);

      const advice = await api.getDomAdvice();
      it('should run simple script', () =>
        api
          .runDomAdvice(url, advice, {
            browser,
            iterations: 1,
            pageCompleteCheck: 'return window.performance.timing.loadEventEnd>0'
            // TODO test that we actually have DOM data and valid HAR
          })
          .should.eventually.have.nested.property('advice.info.amp'));
    });
  });
});
