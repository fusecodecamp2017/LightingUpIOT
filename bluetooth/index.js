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
   var skipCommand = false;

   switch(command) {
    case 'on': turnTheLightOn(); break;
    case 'off': turnTheLightOff(); break;
    case 'color': turnTheLightTheColor(); break;
    case 'exit': disconnectAndExit(); skipCommand = true; break;
  }

  if (!skipCommand) readCommand();
}

function turnTheLightTheColor() {
  rl.question('What color: ', changeColors);
}

function changeColors(color) {
  if (!colorsWeKnow.hasOwnProperty(color)) {
    console.log("I don't know that color!\n");
    readCommand();
    return;
  }

  var fullColorCommand = [0x56];
  fullColorCommand = fullColorCommand.concat(colorsWeKnow[color]);
  fullColorCommand = fullColorCommand.concat([0x00, 0xF0, 0xAA]);
  console.log("full command is: " + fullColorCommand);

  light.writeHandle(0x002E, new Buffer(fullColorCommand), true);
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
