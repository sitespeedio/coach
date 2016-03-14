'use strict';

const api = require('../../lib/');

const LOCAL_SERVER = 'http://0.0.0.0:8282/info/head.html';

describe('Run API:', function() {

  it('should work', () => {
    return api.run(LOCAL_SERVER)
      .then((result) => {
        return result.should.have.ownProperty('results');
      });
  })
});
