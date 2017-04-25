import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { Buffer } from 'buffer';

// import { BeaconProvider } from '../../providers/beacon-provider';
// import { BeaconModel } from '../../models/beacon-model';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // beacons: BeaconModel[] = [];
  zone: NgZone;
  debug_messages: string;
  isConnected: boolean;
  device: any;
  topic: string = 'light-control';

  // constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
  constructor(public navCtrl: NavController, public platform: Platform, public events: Events) {
  	this.debug_messages = "No Debug Message";
    this.zone = new NgZone({ enableLongStackTrace: false });

    console.log(AWS);

    var config = new AWS.Config({
      credentials: new AWS.Credentials({
        accessKeyId: '<access key>',
        secretAccessKey: '<access key key>'
      }),
      region: 'us-east-1'
    });

    this.device = new AWS.IotData({
      credentials: config.credentials,
      region: config.region,
      endpoint: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
    });
  }

  sendCommand(command) {
    this.debug_messages = 'sending "' + command +'"';
    this.device.publish(this.getCommand(command), this.handleResult);
  }

  getCommand(command) {
    return { topic: this.topic, payload: this.getMessage(command), qos: 0 };
  }

  getMessage(message) {
    return JSON.stringify({message: message});
  }

  handleResult(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
  	  this.debug_messages = "Starting to initialize";

      // this.beaconProvider.initialize().then((isInitialized) => {
  	  	// this.debug_messages = "initialize complete";

      //   if (isInitialized) {
      //     this.listenToBeaconEvents();
      //   }
      // });
    });
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
  	  this.debug_messages = "got the beacons in region event";

      // this.zone.run(() => {
      //   this.beacons = [];
      //   let beaconList = data.beacons;
      //   beaconList.forEach((beacon) => {
      //     let beaconObject = new BeaconModel(beacon);
      //     this.beacons.push(beaconObject);

      //     if (this.isConnected) {
      //       if (Math.abs(beaconObject.rssi) < 70) {
      //       	this.sendCommand('on');
      //       } else {
      //       	this.sendCommand('off');
      //       }
      //     }
      //   });
      // });
    });
  }
}