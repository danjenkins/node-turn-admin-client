'use strict';

var carrier = require('carrier');
var connect = require('./lib/connection');
var parse = require('./lib/parser');

function TurnAdminClient(params) {
  this.port = params.port || 5766;
  this.host = params.host || 'localhost';
  this.username = params.username || null;
  this.password = params.password || null;
  this.encoding = params.encoding || 'utf8';
  this.conn = null;
}

TurnAdminClient.prototype.init = function () {
  this.conn = connect({
    port: this.port,
    hostname: this.host,
    encoding: this.encoding
  });
};

TurnAdminClient.prototype.getActiveSessions = function (cb) {

  this.conn.write('ps');

  var sessions = [];

  carrier.carry(this.conn, function carrierCb(rawData) {

    if (rawData.indexOf('Total sessions') !== -1) {
      //when it gets to  "Total sessions <num>" we know we're done; check the numbers are right!
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
  this.conn.end();
};

module.exports = TurnAdminClient;
