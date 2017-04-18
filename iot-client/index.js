var iot = require('aws-iot-device-sdk');
var deviceShadow = iot.thingShadow({
  keyPath: '../iot/certificate/LightBulb.private.key',
  certPath: '../iot/certificate/LightBulb.cert.pem',
  caPath: '../iot/certificate/root-CA.crt',
  clientId: 'arn:aws:iot:us-east-1:358646606333:thing',
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
});

var eventTimeout = 1000;
var currentEvent = 0;
var eventSequence = ['on', 'blue', 'red', 'green', 'off'];

deviceShadow.on('connect', function() {
  setInterval(runEventSequence, eventTimeout);
});

function runEventSequence() {
  sendCommand(eventSequence[currentEvent++]);
  if (currentEvent >= eventSequence.length) currentEvent = 0;
}

function sendCommand(command) {
  console.log('sending "' + command +'"');
  deviceShadow.publish('light-control', getMessage(command));
}

deviceShadow.on('status', function(thingName, stat, clientToken, stateObject) {
  console.log('received ' + stat + ' on ' + thingName + ': ' + JSON.stringify(stateObject));
});

function getMessage(message) {
  return JSON.stringify({message: message});
}