'use strict';

var beginning = "\r\n";

var firstEntry =
    "    1) id=000000000000034864, user <1-QzZGODU5MDMtOTk3MS00QzQ0LThDMDQtNjA0ODk0ODUzMzVC-TWF0dEZyZWRyaWNrc29uMg==-ODk0NkFFMzktMTA2Qi00OTZELThCRDEtRDE2OTQzMkZGRjlF.1401812136>:\r\n" +
    "      started 26 secs ago\r\n" +
    "      expiring in 574 secs\r\n" +
    "      client protocol UDP, relay protocol UDP\r\n" +
    "      client addr 216.207.245.1:51271, server addr 172.31.19.145:3478\r\n" +
    "      relay addr 172.31.19.145:51345\r\n" +
    "      fingerprints enforced: OFF\r\n" +
    "      mobile: OFF\r\n" +
    "      SHA256: OFF\r\n" +
    "      SHA type: SHA1\r\n" +
    "      usage: rp=6, rb=1204, sp=5, sb=508\r\n" +
    "       rate: r=0, s=0, total=0 (bytes per sec)\r\n" +
    "      peers:\r\n" +
    "          10.24.65.91\r\n" +
    "          216.207.245.1\r\n" +
    "          10.24.250.86\r\n" +
    "          54.200.182.167\r\n\r\n";

var secondEntry =
    "    2) id=000000000000034865, user <1-QzZGODU5MDMtOTk3MS00QzQ0LThDMDQtNjA0ODk0ODUzMzVC-TWF0dEZyZWRyaWNrc29u-RkQ2NkQ4OTEtMTNERC00MzJELTk3RjktMjU5OUI2QkEwNDM0.1401812145>:\r\n" +
    "      started 19 secs ago\r\n" +
    "      expiring in 582 secs\r\n" +
    "      client protocol UDP, relay protocol UDP\r\n" +
    "      client addr 216.207.245.1:57356, server addr 172.31.19.145:3478\r\n" +
    "      relay addr 172.31.19.145:55320\r\n" +
    "      fingerprints enforced: OFF\r\n" +
    "      mobile: OFF\r\n" +
    "      SHA256: OFF\r\n" +
    "      SHA type: SHA1\r\n" +
    "      usage: rp=6, rb=1184, sp=5, sb=508\r\n" +
    "       rate: r=0, s=0, total=0 (bytes per sec)\r\n" +
    "      peers:\r\n" +
    "          10.24.65.91\r\n" +
    "          216.207.245.1\r\n" +
    "          10.24.250.86\r\n" +
    "          54.200.182.167\r\n\r\n";

var total =
    "  Total sessions: 2\r\n\r\n";

var emptySessions =
    "\r\n\r\nTotal sessions: 0\r\n\r\n";

var welcomeMessage =
'TURN Server\r\n' +
'rfc5766-turn-server\r\n' +
'Citrix-3.2.2.8 \'Marshal West\'\r\n\r\n' +
'Type \'?\' for help\r\n';

var prompt = '> ';

module.exports = {
    emptySessionData: emptySessions,
    fullSessionData: beginning + firstEntry + secondEntry + total,
    singleSessionEntry: firstEntry,
    welcomeMessageData: welcomeMessage,
    prompt: prompt
};
