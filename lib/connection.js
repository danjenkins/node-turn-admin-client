'use strict';

var net = require('net');

module.exports = function createConnection(options) {

  var options = options || {};

  var connection = net.createConnection(options.port, options.host);
  connection.setEncoding(options.encoding);

  if (options.keepAlive) {
    connection.setKeepAlive(true, 500);
  }

  if (options.onConnect) {
    connection.on('connect', options.onConnect);
  }

  if (options.onError) {
    connection.on('error', options.onError);
  }
  return connection;

};
