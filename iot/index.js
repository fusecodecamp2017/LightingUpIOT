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
  var command = JSON.parse(payload).message;
  console.log("Received command: " + command);
  handleCommand(command);
}

// ********************************************************
//
// BEGIN THE PART WHERE WE COPIED AND PASTED ALL THE
// BLUETOOTH CODE
//
// ********************************************************


noble.on('stateChange', function (state) {
  if (state == 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(device) {
  console.log("Found device: " + device.id);

  if (device.id.toUpperCase() == getOurLightBulbAddress()) {
    noble.stopScanning();
    light = device;
    connectToTheLight();
  }
});

function connectToTheLight() {
  light.connect(onConnect);
}

function onConnect() {
  light.on('disconnect', handleDisconnect);
}

function handleCommand(command) {
   switch(command) {
    case 'on': turnTheLightOn(); break;
    case 'off': turnTheLightOff(); break;
    default: turnTheLightTheColor(command); break;
  }
}

function turnTheLightTheColor(color) {
  if (!colorsWeKnow.hasOwnProperty(color)) {
    console.log("I don't know that color!\n");
    return;
  }

  var fullColorCommand = [0x56];
  fullColorCommand = fullColorCommand.concat(colorsWeKnow[color]);
  fullColorCommand = fullColorCommand.concat([0x00, 0xF0, 0xAA]);
  console.log("full command is: " + fullColorCommand);

  light.writeHandle(0x002E, new Buffer(fullColorCommand), true);
}

function handleDisconnect() {
  process.exit(0);
}

function disconnectAndExit() {
  light.disconnect();
}

function turnTheLightOff() {
  light.writeHandle(0x002e, new Buffer([0xcc, 0x24, 0x33]), true);
}

function turnTheLightOn(connectionError) {
  light.writeHandle(0x002e, new Buffer([0xcc, 0x23, 0x33]), true);
}

function getOurLightBulbAddress() {
   return ourLightBulb.replace(/:/g, '');
}
