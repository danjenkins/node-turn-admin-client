'use strict';

var net = require('net');
var fs = require('fs');
var testData =  fs.readFileSync(__dirname + '/testData.txt');

module.exports = function () {
  var server = net.createServer(function (conn) {

    conn.setEncoding('utf8');

    conn.on('end', function () {

    });

    conn.on('data', function (data) {
      if (data.indexOf('ps') !== -1) {
        conn.write('\n' + testData + '\n>');
      }
    });

    conn.write(
      'TURN Server\n' +
      'rfc5766-turn-server\n' +
      'Citrix-3.2.2.8 \'Marshal West\'\n\n' +
      'Type \'?\' for help\n' +
      '>'
    );
  });

  server.listen(8124, function () {

  });

  return server;
};
