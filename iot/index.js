var iot = require('aws-iot-device-sdk');
var _ = require('underscore');
var noble = require('noble');
var readline = require('readline');
var ourLightBulb = '04:A3:16:9C:B9:78';
var light;
var colorsWeKnow = {
  red: [0xFF, 0x00, 0x00],
  green: [0x00, 0xFF, 0x00],
  blue: [0x00, 0x00, 0xFF],
  cool: [0x10, 0xAD, 0xED],
  yellow: [0xFE, 0xCA, 0x1E],
  white: [0xD1, 0xE5, 0xE1],
  fullwhite: [0xFF, 0xFF, 0xFF]
};

// ********************************************************
//
// ALL THE IOT STUFF HERE
//
// ********************************************************

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
  // TODO: Handle the command using our bluetooth stuff
}

// ********************************************************
//
// TODO: COPY AND PASTED ALL THE BLUETOOTH CODE
//       THEN REMOVE READING COMMANDS
//
// ********************************************************

