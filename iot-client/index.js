
var iot = require('aws-iot-device-sdk');
var deviceShadow = iot.thingShadow({
  keyPath: '../iot/certificate/LightBulb.private.key',
  certPath: '../iot/certificate/LightBulb.cert.pem',
  caPath: '../iot/certificate/root-CA.crt',
  clientId: 'arn:aws:iot:us-east-1:358646606333:thing',
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
});

deviceShadow.on('connect', function() {
  // TODO: send some commands to the device (deviceShadow.publish)
  // TODO: Part 2, lets send a list of commands
});

deviceShadow.on('status', function(thingName, stat, clientToken, stateObject) {
  // TODO: we just got status, what now?
});

