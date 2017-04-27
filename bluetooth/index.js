var noble = require('noble');
var readline = require('readline');
var ourLightBulb = '04:A3:16:9C:B9:78';

//Use this for reading from/writing to the standard input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

noble.on('stateChange', function (state) {
  //scan for devices while powered on
});

noble.on('discover', function(device) {
  //if we find our device with the correct id, connect to it
});

//Prompt the user for input
function readCommand() {
  rl.question('Enter Command: ', handleCommand);
}

function handleCommand(command) {
  //do stuff with that command
}