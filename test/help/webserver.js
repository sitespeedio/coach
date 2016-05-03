'use strict';

let Promise = require('bluebird'),
  fs = require('fs'),
  connect = require('connect'),
  serveStatic = require('serve-static'),
  http = require('http'),
  http2 = require('http2'),
  path = require('path');

Promise.promisifyAll(fs);

function createServer(useHttp2) {
  const testdataFolder = path.join(__dirname, '..'),
    app = connect();

  app.use(serveStatic(path.resolve(testdataFolder, 'http-server'), {}));
  if (useHttp2) {
    const certsFolder = path.join(testdataFolder, 'testdata', 'certs'),
      httpsOptions = {
        key: fs.readFileSync(path.join(certsFolder, 'server.key'), 'utf8'),
        cert: fs.readFileSync(path.join(certsFolder, 'server.crt'), 'utf8'),
        passphrase: 'coach'
      };

    return http2.createServer(httpsOptions, app);
  } else {
    return http.createServer(app);
  }
}

let server;

module.exports = {
  startServer(useHttp2) {
    if (!server) {
      server = createServer(useHttp2);
    }
    return new Promise((resolve, reject) => {
      server.listen(0, '0.0.0.0')
        .on('error', (e) => reject(e))
        .on('listening', () => resolve(server.address()));
    });
  },
  stopServer() {
    return Promise
      .resolve(server.close())
      .finally(() => {
        server = undefined;
      });
  }
};
