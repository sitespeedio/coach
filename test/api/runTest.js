'use strict';

const api = require('../../lib/');

const LOCAL_SERVER = 'http://0.0.0.0:8282/info/head.html';

describe('Run API:', function() {

  it('should output correct structure', () =>
    api.run(LOCAL_SERVER)
      .then((result) => {
        const advice = result.coachAdvice;

        ['results', 'errors', 'url', 'version'].forEach((property) =>
          advice.should.have.ownProperty(property)
        );

        ['accessibility', 'bestpractice', 'info', 'performance', 'timings', 'score'].forEach((property) =>
          advice.results.should.have.ownProperty(property)
        );
      }))
});
