import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
  	this.debug_messages = "No Debug Message";
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.beaconProvider.initialize().then((isInitialized) => {
        if (isInitialized) {
          this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {
    // TODO: Subscribe to beacon events
    //
    //       this.events.subscribe('didRangeBeaconsInRegion', (data) => {
    //          // Put your run code here
    //       });
    //
    // TODO: When a bean is connected put them in the "beacons" list to
    //       show on our screen
    //
    //       this.zone.run(() => {
    //          // TODO: put your code here!
    //       });
  }
}