'use strict';

const api = require('../../lib/'),
  fs = require('fs'),
  assert = require('assert'),
  Promise = require('bluebird');

Promise.promisifyAll(fs);

describe('Merge API:', function() {

  it('should work', function() {
    let har = [{
      'coachAdvice': {
        'results': {
          'performance': {
            'adviceList': {
              'fromHAR': {
                'advice': '',
                'description': '',
                'id': 'fromHAR',
                'offending': [],
                'score': 100,
                'tags': ['performance'],
                'title': 'Advice from HAR',
                'weight': 1
              }
            }
          }
        }
      },
      'score': 100
    }];
    let dom = {
      'coachAdvice': {
        'results': {
          'performance': {
            'adviceList': {
              'fromDOM': {
                'advice': '',
                'description': '',
                'id': 'fromDOM',
                'offending': [],
                'score': 0,
                'tags': ['performance'],
                'title': 'Advice from DOM',
                'weight': 1
              }
            }
          }
        }
      },
      'score': 0
    };
    let result = api.merge(dom, har);
    assert.strictEqual(Object.keys(result.coachAdvice.results.performance.adviceList).length, 2);
    assert.strictEqual(result.coachAdvice.results.performance.score, 50);
  });
});
