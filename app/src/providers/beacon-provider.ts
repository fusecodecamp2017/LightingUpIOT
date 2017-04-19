import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Injectable()
export class BeaconProvider {
	delegate: any;
	region: any;

	constructor(public platform: Platform, public events: Events, private ibeacon: IBeacon) { }

	initialise() : any {
		return new Promise((resolve, reject) => {
			this.ibeacon.requestAlwaysAuthorization();
			this.delegate = this.ibeacon.Delegate();
			this.delegate.didRangeBeaconsInRegion()
				.subscribe(
					data => { this.events.publish('didRangeBeaconsInRegion', data); },
					error => console.error()
				);

			this.region = this.ibeacon.BeaconRegion('deskBeacon', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D');
			this.ibeacon.startRangingBeaconsInRegion(this.region)
				.then(() => { resolve(true); });
		});
	}
}