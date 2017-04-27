var iotdata = new AWS.IotData({
  credentials: config.credentials,
  endpoint: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com',
  region: config.region
});

(function intialize() {
  sendSomethingToALight();
})();

function sendSomethingToALight() {
  // TODO: Send a command with `iotdata.publish`
  // var command = 'off';
  // iotdata.publish(getCommand(command), handleResult);
}

function getCommand(command) {
  // TODO: convert our command to amazon language. Looks like:
  //    { topic: <name>, payload: <command>, qos: 0 }
}

