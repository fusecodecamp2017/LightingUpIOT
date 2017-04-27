var iot = require('aws-iot-device-sdk');
var _ = require('underscore');

const device = iot.device({
  keyPath: 'certificate/LightBulb.private.key',
  certPath: 'certificate/LightBulb.cert.pem',
  caPath: 'certificate/root-CA.crt',
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
});

device.on('close', handleClose);
device.on('reconnect', handleReconnect);
device.on('offline', handleOffline);
device.on('error', handleError);
device.on('connect', handleConnect);
device.on('message', handleMessage);

function handleClose(eventType, callback, topic, payload) {

}

function handleReconnect(eventType, callback, topic, payload) {

}

function handleOffline(eventType, callback, topic, payload) {
  // TODO: We just went offline, need to do anything?
}

function handleError(eventType, callback, topic, payload) {
  // TODO: Think about errors, what should we be doing
}

function handleConnect(eventType, callback, topic, payload) {
  // TODO: subscribe
}

function handleMessage(topic, payload) {
  // TODO: What happens when we get a message?
}


