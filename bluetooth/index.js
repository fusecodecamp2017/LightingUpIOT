var noble = require('noble');
var readline = require('readline');
var ourLightBulb = '04:A3:16:9C:B9:78';
var light;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function readCommand() {
  rl.question('Enter Command: ', handleCommand);
}

function onConnect() {
  light.on('disconnect', handleDisconnect);
  readCommand();
}

function handleCommand(command) {
   switch(command) {
    case 'on': turnTheLightOn(); break;
    case 'off': turnTheLightOff(); break;
    case 'exit': disconnectAndExit(); break;
  }

  readCommand();
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
