'use strict';

var parseData = {
    header: {
        regex: /(\d)\)\s+id=(\d+), user <([a-zA-Z0-9\-\=\.]+)>:\n/,
        captureKeys: [ 'recordNumber', 'id', 'user' ]
    },
    timing: {
        regex: /\n\s+started\s(\d+)\s(secs|mins|hours|days)\sago\n\s+expiring\sin\s(\d+)\s(secs|mins|hours|days)\n/,
        captureKeys: [ 'started', 'startedTimeFormat', 'expires', 'expiresTimeFormat' ]
    },
    protocol: {
        regex: /\n\s+client\sprotocol\s(UDP|TCP),\srelay\sprotocol\s(UDP|TCP)\n/,
        captureKeys: [ 'clientProtocol', 'relayProtocol' ]
    },
    addresses: {
        regex: /\n\s+client\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+),\sserver\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+)\n\s+relay\saddr\s((?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d+)\n/,
        captureKeys: [ 'clientAddress', 'serverAddress', 'relayAddress' ]
    },
    properties: {
        regex: /\n\s+fingerprints\senforced:\s(OFF|ON)\n\s+mobile:\s(OFF|ON)\n\s+SHA256:\s(OFF|ON)\n\s+SHA\stype:\s(SHA1)\n/,
        captureKeys: [ 'fingerprints', 'mobile', 'SHA256', 'SHAType' ]
    },
    usage: {
        regex: /\n\s+usage:\srp=(\d+),\srb=(\d+),\ssp=(\d+),\ssb=(\d+)\n/,
        captureKeys: [ 'usageRP', 'usageRB', 'usageSP', 'usageSB' ]
    },
    rate: {
        regex: /\n\s+rate:\sr=(\d+),\ss=(\d),\stotal=(\d+)\s\(bytes\sper\ssec\)\n/,
        captureKeys: [ 'rateR', 'rateS', 'rateTotal' ]
    },
    peers: {
        regex: /\n\s+peers:\n\s+([\s\.\d\n]+)$/,
        captureKeys: [ 'peers' ]
    }
};

var ipRegexString = '(?:[0-9]{1,3}\\.){3}[0-9]{1,3}';
var ipAddressRegex = new RegExp(ipRegexString);

module.exports = function parseResult(source) {
  var results = {};

  var clean = source.replace(/\r\n/g, '\n');

  Object.keys(parseData).forEach(function (dataPoint) {
      var parseCriteria = parseData[dataPoint];
      var parsed = parseCriteria.regex.exec(clean);

      if (!parsed) {
          throw new Error("unable to parse '" + dataPoint + "' from data.");
      }

      parsed.shift();

      parseCriteria.captureKeys.forEach(function (captureKey, index) {
          if (captureKey !== 'peers') {
              results[captureKey] = parsed[index];
              return;
          }

          // 'peers' capture needs special treatment
          results[captureKey] = [];
          var ipAddresses = parsed[index].split('\n');
          ipAddresses.forEach(function getIpAddresses(line) {
              var ipAddress = ipAddressRegex.exec(line);
              if (ipAddress && ipAddress[0]) {
                  results[captureKey].push(ipAddress[0]);
              }
          });
      });
  });

  return results;
};
