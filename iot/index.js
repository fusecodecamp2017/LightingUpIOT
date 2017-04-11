var iot = require('aws-iot-device-sdk');

var deviceId = 'a93bd9538a';
var device= iot.device({
  keyPath: 'certificate/'
});
