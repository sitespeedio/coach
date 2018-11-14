'use strict';

const urlParser = require('url');

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
    if (!url) {
      return '';
    }

    return urlParser.parse(url).hostname || '';
  },
  /**
   * Convert bytes to human readable.
   * @param {Number} bytes
   * @returns {String} human readable file size
   */
  formatBytes(bytes) {
    var sizes = ['B', 'kB', 'MB', 'GB', 'TB'];

    if (bytes === 0) {
      return '0 B';
    }

    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
    return Math.round(bytes / Math.pow(1000, i) * 10) / 10 + ' ' + sizes[i];
  },
  /**
   * Print seconds as the largest available time.
   * @param {int} seconds A number in seconds
   * @return {String} The time in nearest largest definition.
   */
  prettyPrintSeconds: function(seconds) {
    if (typeof seconds === 'undefined') {
      return '';
    }

    var secondsPerYear = 365 * 24 * 60 * 60,
      secondsPerWeek = 60 * 60 * 24 * 7,
      secondsPerDay = 60 * 60 * 24,
      secondsPerHour = 60 * 60,
      secondsPerMinute = 60,
      sign = seconds < 0 ? '-' : '';

    if (seconds < 0) {
      seconds = Math.abs(seconds);
    }

    if (seconds / secondsPerYear >= 1) {
      return (
        sign +
        Math.round(seconds / secondsPerYear) +
        ' year' +
        (Math.round(seconds / secondsPerYear) > 1 ? 's' : '')
      );
    } else if (seconds / secondsPerWeek >= 1) {
      return (
        sign +
        Math.round(seconds / secondsPerWeek) +
        ' week' +
        (Math.round(seconds / secondsPerWeek) > 1 ? 's' : '')
      );
    } else if (seconds / secondsPerDay >= 1) {
      return (
        sign +
        Math.round(seconds / secondsPerDay) +
        ' day' +
        (Math.round(seconds / secondsPerDay) > 1 ? 's' : '')
      );
    } else if (seconds / secondsPerHour >= 1) {
      return (
        sign +
        Math.round(seconds / secondsPerHour) +
        ' hour' +
        (Math.round(seconds / secondsPerHour) > 1 ? 's' : '')
      );
    } else if (seconds / secondsPerMinute >= 1) {
      return (
        sign +
        Math.round(seconds / secondsPerMinute) +
        ' minute' +
        (Math.round(seconds / secondsPerMinute) > 1 ? 's' : '')
      );
    } else {
      return (
        sign + seconds + ' second' + (seconds > 1 || seconds === 0 ? 's' : '')
      );
    }
  },
  human(node, pretty) {
    if (!node) {
      return undefined;
    }

    let clean = {};
    Object.keys(node).forEach(function(key) {
      clean[key] = pretty(node[key]);
    });
    return clean;
  }
};
