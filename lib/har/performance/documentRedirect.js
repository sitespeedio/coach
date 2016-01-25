'use strict';

module.exports = {
  id: 'documentRedirect',
  title: 'Avoid redirect the main document',
  description: 'You should never ever redirect the main document.',
  weight: 9,
  tags: ['performance'],
  processPage: function(page) {

    return {
      score: page.documentRedirects > 0 ? 0 : 100,
      offending: [],
      advice: page.documentRedirects > 0 ? 'The main document gets redirected ' + page.documentRedirects + ' time(s). Remove that redirect!' : ''
    };
  }
};
