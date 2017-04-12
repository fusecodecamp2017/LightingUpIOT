var iot = require('aws-iot-device-sdk');
var _ = require('underscore');

const device = iot.device({
  keyPath: 'certificate/LightBulb.private.key',
  certPath: 'certificate/LightBulb.cert.pem',
  caPath: 'certificate/root-CA.crt',
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
});

_.each(['close', 'reconnect', 'offline', 'error'], function(event) {
  device.on(event, _.partial(logEvent, event));
});
device.on('connect', _.partial(logEvent, 'connect', subscribeToTopics));
device.on('message', _.partial(logEvent, 'message', handleMessage));

function logEvent(eventType, callback, topic, payload) {
  console.log('Event: ' + eventType);
  if (callback) callback(topic, payload);
}

function subscribeToTopics() {
  device.subscribe('light-control');
}

function handleMessage(topic, payload) {
  console.log("test message: " + JSON.parse(payload).message);
}