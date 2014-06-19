'use strict';

var carrier = require('carrier');
var connection = require('./lib/connection');
var parse = require('./lib/parser');

var conn;

function TurnAdminClient(params) {
  this.port = params.port || 5766;
  this.host = params.host || 'localhost';
  this.username = params.username || null;
  this.password = params.password || null;
  this.encoding = params.encoding || 'utf8';
}

TurnAdminClient.prototype.init = function () {
  conn = connection({
    port: this.port,
    hostname: this.host,
    encoding: this.encoding
  });
};

TurnAdminClient.prototype.getActiveSessions = function (cb) {

  conn.write('ps');

  var sessions = [];

  carrier.carry(conn, function carrierCb(rawData) {

    if (rawData.indexOf('Total sessions') !== -1) {
      //when it gets to  "Total sessions <num>" we know we're done; check ther numbers are right!
      cb(null, sessions);
      return;
    }

    try {
      sessions.push(parse(rawData));
    }catch (e) {

    }

  }, this.encoding, "\n\n");


};


TurnAdminClient.prototype.disconnect = function () {
  conn.end();
};

module.exports = TurnAdminClient;
