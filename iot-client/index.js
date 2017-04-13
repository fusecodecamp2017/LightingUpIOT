var iot = require('aws-iot-device-sdk');
var deviceShadow = iot.thingShadow({
  keyPath: '../iot/certificate/LightBulb.private.key',
  certPath: '../iot/certificate/LightBulb.cert.pem',
  caPath: '../iot/certificate/root-CA.crt',
  clientId: 'arn:aws:iot:us-east-1:358646606333:thing',
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
});

var clientTokenUpdate;

deviceShadow.on('connect', function() {
  console.log('sending "on"');
  deviceShadow.publish('light-control', getMessage('on'));
  
  console.log('sending "off"');
  deviceShadow.publish('light-control', getMessage('off'));
});

deviceShadow.on('status', function(thingName, stat, clientToken, stateObject) {
  console.log('received '+stat+' on '+thingName+': '+JSON.stringify(stateObject));
});

function getMessage(message) {
  return JSON.stringify({message: message});
}