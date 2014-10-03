'use strict';

var net = require('net');
var fixtures = require('../fixtures');

module.exports = function () {
  var server = net.createServer(function (conn) {

    conn.setEncoding('utf8');

    conn.on('end', function () {

    });

    conn.on('data', function (data) {
      if (data.indexOf('ps') !== -1) {
        conn.write(fixtures.fullSessionData + fixtures.prompt);
      }
    });

    conn.write(fixtures.welcomeMessageData + fixtures.prompt);
  });

  server.listen(8124, function () {

  });

  return server;
};
