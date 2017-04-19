import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';

// import { BeaconProvider } from '../../providers/beacon-provider';
import { BeaconModel } from '../../models/beacon-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  beacons: BeaconModel[] = [];
  zone: NgZone;
  debug_messages: string;

  // constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
  constructor(public navCtrl: NavController) {
  	this.debug_messages = "No Debug Message";
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  // ionViewDidLoad() {
  //   this.platform.ready().then(() => {
  // 	  this.debug_messages = "Starting to initialize";

  //     this.beaconProvider.initialise().then((isInitialised) => {
  //       if (isInitialised) {
  //         this.listenToBeaconEvents();
  //       }
  //     });
  //   });
  // }

  // listenToBeaconEvents() {
  //   this.events.subscribe('didRangeBeaconsInRegion', (data) => {
  //     this.zone.run(() => {
  //       this.beacons = [];
  //       let beaconList = data.beacons;
  //       beaconList.forEach((beacon) => {
  //         let beaconObject = new BeaconModel(beacon);
  //         this.beacons.push(beaconObject);
  //       });
  //     });
  //   });
  // }
}