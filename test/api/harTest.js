'use strict';

const api = require('../../lib/'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  chai = require("chai"),
  chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

Promise.promisifyAll(fs);

describe('HAR apis:', function() {

  describe('getHarAdvice', function() {
    it('should return at least one advice', function() {
      return api.getHarAdvice().should.eventually.not.be.empty;
    });

    it('should only return valid advice', function() {
      return api.getHarAdvice()
        .then((adviceList) => {
          return Promise.each(adviceList, (advice) => {
            return ['id', 'title', 'description','weight', 'tags'].forEach((property) =>
              advice.should.have.ownProperty(property)
            );
          });
        });
    });
  });

  describe('runHarAdvice', function() {
    let har;

    before(() => {
      const harPath = path.join(__dirname, '..', 'har', 'files', 'www.nytimes.com.har');
      return fs.readFileAsync(harPath, 'utf8')
        .then(JSON.parse)
        .then((harFromFile) => {
          har = harFromFile;
        });
    });

    it('should work', () => {
      return api.getHarAdvice()
        .then((adviceList) => {
          return api.runHarAdvice(har, adviceList, {}).should.not.be.empty;
        });
    })
  });

});
