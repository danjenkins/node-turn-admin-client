'use strict';

var ipRegexString = '(?:[0-9]{1,3}\.){3}[0-9]{1,3}';
var ipAddressRegexString = ipRegexString + ':\d+';
var offOnRegexString = 'OFF|ON';
var protocolRegexString = 'UDP|TCP';
var timeRegexString = 'secs|mins|hours|days';

var regex = /(\d)\)\s+id=(\d+), user\n<([a-zA-Z0-9\-\=\.]+)>:\n\s+started\s(\d+)\s(secs|mins|hours|days)\sago\n\s+expiring\sin\s(\d+)\s(secs|mins|hours|days)\n\s+client\sprotocol\s(UDP|TCP),\srelay\sprotocol\s(UDP|TCP)\n\s+client\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+),\sserver\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+)\n\s+relay\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+)\n\s+fingerprints\senforced:\s(OFF|ON)\n\s+mobile:\s(OFF|ON)\n\s+SHA256:\s(OFF|ON)\n\s+SHA\stype:\s(SHA1)\s+usage:\srp=(\d+),\srb=(\d+),\ssp=(\d+),\ssb=(\d+)\n\s+rate:\sr=(\d+),\ss=(\d),\stotal=(\d+)\s\(bytes\sper\ssec\)\n\s+peers:\n\s+([\s\.\d\n]+)$/;

var ipAddressRegex = new RegExp(ipRegexString);

var captureKeys = [
  'recordNumber',
  'id',
  'user',
  'started',
  'startedTimeFormat',
  'expires',
  'expiresTimeFormat',
  'clientProtocol',
  'relayProtocol',
  'clientAddress',
  'serverAddress',
  'relayAddress',
  'fingerprints',
  'mobile',
  'SHA256',
  'SHAType',
  'usageRP',
  'usageRB',
  'usageSP',
  'usageSB',
  'rateR',
  'rateS',
  'rateTotal',
  'peers'//special case, going to be an array
];

module.exports = function parseResult(string) {
  var results = {};

  var parsed = regex.exec(string);

  if (!parsed) {
    throw new Error('No Turn Session Data');
  }

  parsed.shift();

  captureKeys.forEach(function (capture, index) {

    if (capture === 'peers') {
      //if we're at peers we've still got some work to do
      results[capture] = [];

      var ipAddresses = parsed[index].split("\n");
      ipAddresses.forEach(function getIpAddresses(line) {

        var ipAddress = ipAddressRegex.exec(line);

        if (ipAddress && ipAddress[0]) {
          results[capture].push(ipAddress[0]);
        }
      });

      return;
    }

    results[capture] = parsed[index];

  });

  return results;
};
