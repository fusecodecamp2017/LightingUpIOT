var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
var BeaconProvider = (function () {
    function BeaconProvider(platform, events, ibeacon) {
        this.platform = platform;
        this.events = events;
        this.ibeacon = ibeacon;
    }
    BeaconProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.ibeacon.requestAlwaysAuthorization();
            _this.delegate = _this.ibeacon.Delegate();
            _this.delegate.didRangeBeaconsInRegion()
                .subscribe(function (data) { _this.events.publish('didRangeBeaconsInRegion', data); }, function (error) { return console.error(); });
            _this.region = _this.ibeacon.BeaconRegion('deskBeacon', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D');
            _this.ibeacon.startRangingBeaconsInRegion(_this.region)
                .then(function () { resolve(true); });
        });
    };
    return BeaconProvider;
}());
BeaconProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Platform, Events, IBeacon])
], BeaconProvider);
export { BeaconProvider };
//# sourceMappingURL=beacon-provider.js.map