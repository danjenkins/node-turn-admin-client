'use strict';

var mockTurnServer = require('../lib/mockServer');
var mockServer;
var TurnAdminClient = require('../../index');
var chai = require('chai');
var should = chai.should();

describe('run a mock turn interface server', function () {
  before(function () {
    mockServer = mockTurnServer();
  });

  it('and get back some nice parsed data', function (done) {

    var client = new TurnAdminClient({
      port: 8124
    });

    client.init();

    client.getActiveSessions(function (err, sessions) {
      client.disconnect();

      //now check the sessions
      sessions[0].recordNumber.should.be.equal('1');
      sessions[0].id.should.be.equal('000000000000034864');
      sessions[0].user.should.be.equal('1-QzZGODU5MDMtOTk3MS00QzQ0LThDMDQtNjA0ODk0ODUzMzVC-TWF0dEZyZWRyaWNrc29uMg==-ODk0NkFFMzktMTA2Qi00OTZELThCRDEtRDE2OTQzMkZGRjlF.1401812136');
      sessions[0].started.should.be.equal('26');
      sessions[0].starftedTimeFormat.should.be.equal('secs');
      sessions[0].expires.should.be.equal('574');
      sessions[0].expiresTimeFormat.should.be.equal('secs');
      sessions[0].clientProtocol.should.be.equal('UDP');
      sessions[0].relayProtocol.should.be.equal('UDP');

      sessions[0].clientAddress.should.be.equal('216.207.245.1:51271');
      sessions[0].serverAddress.should.be.equal('172.31.19.145:3478');
      sessions[0].relayAddress.should.be.equal('172.31.19.145:51345');

      sessions[0].fingerprints.should.be.equal('OFF');
      sessions[0].mobile.should.be.equal('OFF');
      sessions[0].SHA256.should.be.equal('OFF');
      sessions[0].SHAType.should.be.equal('SHA1');
      sessions[0].usageRP.should.be.equal('6');
      sessions[0].usageRB.should.be.equal('1204');
      sessions[0].usageSP.should.be.equal('5');
      sessions[0].usageSB.should.be.equal('508');
      sessions[0].rateR.should.be.equal('0');
      sessions[0].rateS.should.be.equal('0');
      sessions[0].rateTotal.should.be.equal('0');
      sessions[0].peers.should.be.instanceof(Array);
      sessions[0].peers.should.be.deep.equal([
        '10.24.65.91',
        '216.207.245.1',
        '10.24.250.86',
        '54.200.182.167'
      ]);

      sessions[1].recordNumber.should.be.equal('2');
      sessions[1].id.should.be.equal('000000000000034865');
      sessions[1].user.should.be.equal('1-QzZGODU5MDMtOTk3MS00QzQ0LThDMDQtNjA0ODk0ODUzMzVC-TWF0dEZyZWRyaWNrc29u-RkQ2NkQ4OTEtMTNERC00MzJELTk3RjktMjU5OUI2QkEwNDM0.1401812145');
      sessions[1].started.should.be.equal('19');
      sessions[1].starftedTimeFormat.should.be.equal('secs');
      sessions[1].expires.should.be.equal('582');
      sessions[1].expiresTimeFormat.should.be.equal('secs');
      sessions[1].clientProtocol.should.be.equal('UDP');
      sessions[1].relayProtocol.should.be.equal('UDP');

      sessions[1].clientAddress.should.be.equal('216.207.245.1:57356');
      sessions[1].serverAddress.should.be.equal('172.31.19.145:3478');
      sessions[1].relayAddress.should.be.equal('172.31.19.145:55320');

      sessions[1].fingerprints.should.be.equal('OFF');
      sessions[1].mobile.should.be.equal('OFF');
      sessions[1].SHA256.should.be.equal('OFF');
      sessions[1].SHAType.should.be.equal('SHA1');
      sessions[1].usageRP.should.be.equal('6');
      sessions[1].usageRB.should.be.equal('1184');
      sessions[1].usageSP.should.be.equal('5');
      sessions[1].usageSB.should.be.equal('508');
      sessions[1].rateR.should.be.equal('0');
      sessions[1].rateS.should.be.equal('0');
      sessions[1].rateTotal.should.be.equal('0');
      sessions[1].peers.should.be.instanceof(Array);
      sessions[1].peers.should.be.deep.equal([
        '10.24.65.91',
        '216.207.245.1',
        '10.24.250.86',
        '54.200.182.167'
      ]);

      done();
    });

  });

  after(function () {
    mockServer.close();
  });
});
