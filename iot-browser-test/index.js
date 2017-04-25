var iot = new AWS.Iot(config);
var iotdata = new AWS.IotData({
  credentials: config.credentials,
  endpoint: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com',
  region: config.region
});

(function intialize() {
  listAllLights();
  sendSomethingToALight();
})();


function listAllLights() {
  var params = { thingTypeName: 'Light' };
  iot.listThings(params, handleResult);
}

function sendSomethingToALight() {
  var command = 'off';
  iotdata.publish(getCommand(command), handleResult);
}

function getCommand(command) {
  return { topic: 'light-control', payload: getMessage(command), qos: 0 };
}

function getMessage(message) {
  return JSON.stringify({message: message});
}

function handleResult(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
}