'use strict';

var net = require('net');

module.exports = function createConnection(options) {

  var options = options || {};

  var connection = net.createConnection(options.port, options.host);
  connection.setEncoding(options.encoding);
  connection.setKeepAlive(true, 500);

  return connection;

};
