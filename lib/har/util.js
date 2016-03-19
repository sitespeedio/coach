'use strict';

module.exports = {
  isHTTP2(page) {
    return page.httpType === 'h2' || page.httpType === 'spdy';
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
  },
  /**
   * Convert bytes to human readable.
   * @param {Number} bytes
   * @returns {String} human readable file size
   */
  formatBytes(bytes) {
    var sizes = ['B', 'kB', 'MB', 'GB', 'TB'];

    if (bytes === 0)
      return '0 B';

    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
    return Math.round(bytes / Math.pow(1000, i) * 10) / 10 + ' ' + sizes[i];
  }
};
