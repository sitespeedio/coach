'use strict';

const api = require('../../'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  chai = require("chai"),
  chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

Promise.promisifyAll(fs);

describe('HAR apis:', function() {

  describe('getAllAdvice', function() {
    it('should return at least one advice', function() {
      return api.har.getAllAdvice().should.eventually.not.be.empty;
    });

    it('should only return valid advice', function() {
      return api.har.getAllAdvice()
        .then((adviceList) => {
          return Promise.each(adviceList, (advice) => {
            return ['id', 'title', 'description','weight', 'tags'].forEach((property) =>
              advice.should.have.ownProperty(property)
            );
          });
        });
    });
  });

  describe('getPagesFromHar', function() {
    let har;

    before(() => {
      const harPath = path.join(__dirname, '..', 'har', 'files', 'www.nytimes.com.har');
      return fs.readFileAsync(harPath, 'utf8')
        .then(JSON.parse)
        .then((json) => {
          har = json;
        });
    });

    it('should parse valid har', () => {
      const pagesFromHar = api.har.getPagesFromHar(har);
      pagesFromHar.should.have.length(2);
      pagesFromHar.forEach((page) => {
        page.should.have.ownProperty('assets');
      });
    })
  });

  describe('runAdvice', function() {
    let pages;

    before(() => {
      const harPath = path.join(__dirname, '..', 'har', 'files', 'www.nytimes.com.har');
      return fs.readFileAsync(harPath, 'utf8')
        .then(JSON.parse)
        .then((har) => {
          pages = api.har.getPagesFromHar(har);
        });
    });

    it('should work', () => {
      return api.har.getAllAdvice()
        .then((adviceList) => {
          return api.har.runAdvice(pages, adviceList, {}).should.not.be.empty;
        });
    })
  });

});
