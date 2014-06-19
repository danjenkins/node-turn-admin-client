'use strict';

var ipRegexString = '(?:[0-9]{1,3}\.){3}[0-9]{1,3}';
var ipAddressRegexString = ipRegexString + ':\d+';
var offOnRegexString = 'OFF|ON';
var protocolRegexString = 'UDP|TCP';
var timeRegexString = 'secs|mins|hours|days';

var regex = /(\d)\)\s+id=(\d+), user\n<([a-zA-Z0-9\-\=\.]+)>:\n\s+started\s(\d+)\s(secs|mins|hours|days)\sago\n\s+expiring\sin\s(\d+)\s(secs|mins|hours|days)\n\s+client\sprotocol\s(UDP|TCP),\srelay\sprotocol\s(UDP|TCP)\n\s+client\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+),\sserver\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+)\n\s+relay\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+)\n\s+fingerprints\senforced:\s(OFF|ON)\n\s+mobile:\s(OFF|ON)\n\s+SHA256:\s(OFF|ON)\n\s+SHA\stype:\s(SHA1)\s+usage:\srp=(\d+),\srb=(\d+),\ssp=(\d+),\ssb=(\d+)\n\s+rate:\sr=(\d+),\ss=(\d),\stotal=(\d+)\s\(bytes\sper\ssec\)\n\s+peers:\n\s+([\s\.\d\n]+)$/;

var ipAddressRegex = new RegExp(ipRegexString);

var capture = [
  'recordNumber',
  'id',
  'user',
  'started',
  'starftedTimeFormat',
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
  'SHA_type',
  'usage_rp',
  'usage_rb',
  'usage_sp',
  'usage_sb',
  'rate_r',
  'rate_s',
  'rate_total',
  'peers'//special case, going to be an array
];

module.exports = function parseResult(string) {
  var results = {};

  var parsed = regex.exec(string);

  if (!parsed) {
    throw new Error('No Turn Session Data');
  }

  parsed.shift();

  capture.forEach(function (key, num) {

    if (key === 'peers') {
      //if we're at peers we've still got some work to do
      results[key] = [];

      var ipAddresses = parsed[num].split("\n");
      ipAddresses.forEach(function getIpAddresses(line) {

        var ipAddress = ipAddressRegex.exec(line);

        if (ipAddress && ipAddress[0]) {
          results[key].push(ipAddress[0]);
        }
      });

      return;
    }

    results[key] = parsed[num];

  });

  return results;
};
