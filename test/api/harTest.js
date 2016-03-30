'use strict';

const api = require('../../lib/'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

Promise.promisifyAll(fs);

describe('HAR apis:', function() {

  describe('getHarAdvice', function() {
    it('should return at least one advice', () =>
      api.getHarAdvice().should.eventually.not.be.empty
    );

    it('should only return valid advice', () =>
      api.getHarAdvice()
        .then((adviceList) =>
          Promise.each(adviceList, (advice) =>
            ['id', 'title', 'description', 'weight', 'tags'].forEach((property) =>
              advice.should.have.ownProperty(property)
            ))));
  });

  describe('runHarAdvice', function() {
    const harPath = path.join(__dirname, '..', 'har', 'files', 'www.nytimes.com.har'),
      har = fs.readFileAsync(harPath, 'utf8').then(JSON.parse);

    it('should output correct structure', () =>
      api.runHarAdvice(har)
        .then((advicePerPage) => {
          advicePerPage.should.have.length(2);

          const firstPageAdvice = advicePerPage[0];

          firstPageAdvice.should.have.property('version');
          firstPageAdvice.should.have.deep.property('advice.performance');
        }));
  });
});
