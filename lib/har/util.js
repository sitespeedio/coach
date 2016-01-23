/**
 * @fileoverview Utilities for getting content from HAR:s.
 * @author Peter Hedenskog
 * @Copyright (c) 2016, Peter Hedenskog, Tobias Lidskog.
 * Released under the Apache 2.0 License.
 */

'use strict';

module.exports = {
  isHttp2(page) {
    return !(page.httpVersion === '1.1' || page.httpVersion === '1.0');
  },
  /**
   * Get the hostname from a URL string.
   * @param {string} url The URL like https://www.example.com/hepp
   * @returns {string} the hostname
   */
  getHostname(url) {
    if (!url)
      return '';

    let hostname = url.split('/')[2];
    return (hostname && hostname.split(':')[0]) || '';
  }
};
