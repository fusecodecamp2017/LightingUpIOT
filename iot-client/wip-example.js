const iot = require('aws-iot-device-sdk');
const _ = require('underscore');

// Simulate the interaction of a mobile device and a remote thing via the
// AWS IoT service.  The remote thing will be a dimmable color lamp, where
// the individual RGB channels can be set to an intensity between 0 and 255.  
// One process will simulate each side, with testMode being used to distinguish 
// between the mobile app (1) and the remote thing (2).  The remote thing
// will update its state periodically using an 'update thing shadow' operation,
// and the mobile device will listen to delta events to receive the updated
// state information.
const operationTimeout = 10000;
const thingName = 'LightBulb';
var currentTimeout = null;
var isPretendingToBeAMobileApp = process.argv[2] === 'mobile';
var shadowDetails = {
  keyPath: '../iot/certificate/LightBulb.private.key',
  certPath: '../iot/certificate/LightBulb.cert.pem',
  caPath: '../iot/certificate/root-CA.crt',
  clientId: 'arn:aws:iot:us-east-1:358646606333:' + (isPretendingToBeAMobileApp ? 'phone' : 'thing'),
  region: 'us-east-1',
  host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
};
const thingShadows = iot.thingShadow(shadowDetails);
var stack = [];

(function initialize() {
   (isPretendingToBeAMobileApp ? mobileAppConnect : deviceConnect)();
})();

function updateShadowState(newState) {
   console.log('trying to send a new state: ' + JSON.stringify(newState));
   var clientToken = thingShadows.update(thingName, newState);

   if (clientToken === null) {
      // The thing shadow operation can't be performed because another one
      // is pending; if no other operation is pending, reschedule it after an 
      // interval which is greater than the thing shadow operation timeout.
      if (currentTimeout !== null) {
         console.log('operation in progress, scheduling retry...');
         currentTimeout = setTimeout(function() { updateShadowState(newState); }, operationTimeout * 2);
      }
   } else {
      // Save the client token so that we know when the operation completes.
      stack.push(clientToken);
   }
}

function generateRandomState() {
   return {state: {desired: {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
   }}};
}

function mobileAppConnect() {
   thingShadows.register(thingName, { ignoreDeltas: false },
      function(err, failedTopics) {
         if (!err && !failedTopics) {
            console.log('Mobile thing registered.');
         }
      });
}

function deviceConnect() {
   thingShadows.register(thingName, { ignoreDeltas: true },
      function(err, failedTopics) {
         if (!err && !failedTopics) {
            console.log('Device thing registered.');
            updateShadowState(generateRandomState());
         }
      });
}

function handleStatus(thingName, stat, clientToken, stateObject) {
   console.log('Event [status]');

   var expectedClientToken = stack.pop();

   if (expectedClientToken === clientToken) {
      console.log('got \'' + stat + '\' status on: ' + thingName);
   } else {
      console.log('(status) client token mismtach on: ' + thingName);
   }

   if (!isPretendingToBeAMobileApp) {
      console.log('updated state to thing shadow');
      // If no other operation is pending, restart it after 10 seconds.
      if (currentTimeout === null) {
         currentTimeout = setTimeout(function() {
            currentTimeout = null;
            updateShadowState(generateRandomState());
         }, 10000);
      }
   }
}

function handleDelta(thingName, stateObject) {
   if (!isPretendingToBeAMobileApp) {
      console.log('unexpected delta in device mode: ' + thingName);
   } else {
      console.log('delta on: ' + thingName + JSON.stringify(stateObject));
   }
}

function handleTimeout(thingName, clientToken) {
   var expectedClientToken = stack.pop();

   if (expectedClientToken === clientToken) {
      console.log('timeout on: ' + thingName);
   } else {
      console.log('(timeout) client token mismtach on: ' + thingName);
   }

   if (isPretendingToBeAMobileApp) {
      updateShadowState(generateRandomState());
   }
}

function handleClose() {
   console.log('close');
   thingShadows.unregister(thingName);
}

function handleOffline() {
   // If any timeout is currently pending, cancel it.
   if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
   }

   // If any operation is currently underway, cancel it.
   while (stack.length) {
      stack.pop();
   }
   console.log('offline');
}

function handleMessage(topic, payload) {
   console.log('message', topic, payload.toString());
}

thingShadows.on('close', handleClose);
thingShadows.on('connect', _.partial(logEvent, 'connected to AWS IoT'));
thingShadows.on('reconnect', _.partial(logEvent, 'reconnect'));
thingShadows.on('error', _.partial(logEvent, 'error'));
thingShadows.on('offline', handleOffline);
thingShadows.on('message', handleMessage);
thingShadows.on('status', handleStatus);
thingShadows.on('delta', handleDelta);
thingShadows.on('timeout', handleTimeout);

function logEvent(eventType) {
   console.log('Event [' + eventType + ']');
}

