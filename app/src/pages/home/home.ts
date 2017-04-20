import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { MqttClient } from 'web-mqtt-client';
import * as v4 from 'aws-signature-v4';
import * as crypto from 'crypto-browserify';
import { WebSocket } from 'ws';

import { BeaconProvider } from '../../providers/beacon-provider';
import { BeaconModel } from '../../models/beacon-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  beacons: BeaconModel[] = [];
  zone: NgZone;
  debug_messages: string;
  isConnected: boolean;
  client: any;
  MQTT_TOPIC: string = 'light-control';


  constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
  	this.debug_messages = "No Debug Message";
    this.zone = new NgZone({ enableLongStackTrace: false });

    var AWS_ACCESS_KEY = 'AKIAJJT6VPZ3OD54YCNQ';
    var AWS_SECRET_ACCESS_KEY = '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';
    var AWS_IOT_ENDPOINT_HOST = 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com';

   //  this.deviceShadow = new iot.thingShadow({
	  //   // keyPath: '../iot/certificate/LightBulb.private.key',
	  //   // certPath: '../iot/certificate/LightBulb.cert.pem',
	  //   // caPath: '../iot/certificate/root-CA.crt',
	  //   privateKey: lightPrivateKey,
	  //   clientCert: lightCertificate,
	  //   caCert: rootCert,
	  //   clientId: 'arn:aws:iot:us-east-1:358646606333:thing',
	  //   region: 'us-east-1',
	  //   host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
	  // });
	this.client = MqttClient(() => {
	    const url = v4.createPresignedURL(
	        'GET',
	        AWS_IOT_ENDPOINT_HOST.toLowerCase(),
	        '/mqtt',
	        'iotdevicegateway',
	        crypto.createHash('sha256').update('', 'utf8').digest('hex'),
	        {
	            'key': AWS_ACCESS_KEY,
	            'secret': AWS_SECRET_ACCESS_KEY,
	            'protocol': 'wss',
	            'expires': 15
	        }
	    );

	    return new WebSocket(url, [ 'mqttv3.1' ]);
	});

	this.client.on('connect', () => { this.handleConnect(); });
  }

  handleConnect() {
  	this.isConnected = true;
  	this.debug_messages = 'Connected To Device Shadow';
  }

  // handleStatus(thingName, stat, clientToken, stateObject) {
  //   this.debug_messages = 'received ' + stat + ' on ' + thingName + ': ' + JSON.stringify(stateObject);
  // }

  sendCommand(command) {
    this.debug_messages = 'sending "' + command +'"';
  	this.client.publish(this.MQTT_TOPIC, this.getMessage(command));
    // this.deviceShadow.publish('light-control', this.getMessage(command));
  }

  // subscribeToDeviceEvents(deviceShadow) {
  //   deviceShadow.on('connect', this.handleConnect);
  //   deviceShadow.on('status', this.handleStatus);
  // }

  getMessage(message) {
    return JSON.stringify({message: message});
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
  	  this.debug_messages = "Starting to initialize";

      this.beaconProvider.initialize().then((isInitialized) => {
  	  	this.debug_messages = "initialize complete";

        if (isInitialized) {
          this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
  	  this.debug_messages = "got the beacons in region event";

      this.zone.run(() => {
        this.beacons = [];
        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          let beaconObject = new BeaconModel(beacon);
          this.beacons.push(beaconObject);

          if (this.isConnected) {
            if (Math.abs(beaconObject.rssi) < 70) {
            	this.sendCommand('on');
            } else {
            	this.sendCommand('off');
            }
          }
        });
      });
    });
  }
}