import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';

import { BeaconProvider } from '../../providers/beacon-provider';
import { BeaconModel } from '../../models/beacon-model';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  beacons: BeaconModel[] = [];
  zone: NgZone;
  debug_messages: string;
  device: any;
  topic: string = 'light-control';
  beacon_major: number = 49056;
  beacon_minor: number = 47323;
  last_update_sent: Date = new Date();
  light_is_on: boolean;
  recent_points: any[] = [];


  constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
  	this.debug_messages = "No Debug Message";
    this.zone = new NgZone({ enableLongStackTrace: false });

    console.log(AWS);

    var config = new AWS.Config({
      credentials: new AWS.Credentials({
        accessKeyId: 'AKIAIICSLCJNP2H2NMLQ',
        secretAccessKey: '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'
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
    this.last_update_sent = new Date();
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
        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          if (this.isBeaconWeCareAbout(beacon)) {
            this.updateBeaconsList(beacon);
            this.saveBeaconCurrentRssi();

            if (this.canSendUpdate()) {
              if (this.shouldTurnOn()) {
                this.turnLightOn();
              } else {
                this.turnLightOff();
              }
            }
          }
         });
      });
    });
  }

  shouldTurnOn() {
    // when on
    //    looking for three off points
    //    found any "on" points? don't toggle
    // when off
    //    looking for three ON points
    //    found any "off" points? Don't toggle


    var lookingForAllOffPoints = this.light_is_on;
    var shouldToggleState = true;
    var threshold = 78;

    this.recent_points.forEach(function(point) {
      var isOffPoint = (Math.abs(point) >= threshold);
      if (lookingForAllOffPoints) {
        shouldToggleState = shouldToggleState && !isOffPoint;
      } else {
        shouldToggleState = shouldToggleState && isOffPoint;
      }
    });

    return shouldToggleState && !this.light_is_on;
  }

  turnLightOff() {
    if (this.light_is_on) {
      this.light_is_on = false;
      this.sendCommand('off');
    }
  }

  turnLightOn() {
    if (!this.light_is_on) {
      this.light_is_on = true;
      this.sendCommand('on');
    }
  }

  saveBeaconCurrentRssi() {
    if (this.beacons[0].rssi && this.beacons[0].rssi > 0) {
      if (this.recent_points.length > 3) {
        this.recent_points.shift();
      }

      if (this.recent_points[this.recent_points.length - 1] !== this.beacons[0].rssi) {
        this.recent_points.push(this.beacons[0].rssi);
      }
    }
  }

  updateBeaconsList(beacon) {
    if (this.beacons.length == 0) {
      this.beacons.push(new BeaconModel(beacon));
    } else {
      this.beacons[0].rssi = beacon.rssi;
    }
  }

  canSendUpdate() {
    let dateDifference = (new Date()).getTime() - this.last_update_sent.getTime();
    return (dateDifference / 1000.0) > 1.5;
  }

  isBeaconWeCareAbout(beacon) {
    return beacon && beacon.major == this.beacon_major && beacon.minor == this.beacon_minor;
  }
}