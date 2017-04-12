var iot = require('aws-iot-device-sdk');

const device = iot.device({
  keyPath: 'certificate/LightBulb.private.key',
  certPath: 'certificate/LightBulb.cert.pem',
  caPath: 'certificate/root-CA.crt',
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com',
  debug: false

  // TODO: Figure out the hopefully optional parameters
  // clientId: args.clientId,
  // baseReconnectTimeMs: args.baseReconnectTimeMs,
  // keepalive: args.keepAlive,
  // protocol: args.Protocol,
  // port: args.Port,
});

device
  .on('connect', function() {
     console.log('connected. Subscribing to the light topic');
     device.subscribe('light-control');
  });
device
  .on('close', function() {
     console.log('close');
  });
device
  .on('reconnect', function() {
     console.log('reconnect');
  });
device
  .on('offline', function() {
     console.log('offline');
  });
device
  .on('error', function(error) {
     console.log('error', error);
  });
device
  .on('message', function(topic, payload) {
  	console.log("test message: " + JSON.parse(payload).message);
  });