var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { BeaconProvider } from '../../providers/beacon-provider';
import { BeaconModel } from '../../models/beacon-model';
import * as AWS from 'aws-sdk';
var HomePage = (function () {
    function HomePage(navCtrl, platform, beaconProvider, events) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.beaconProvider = beaconProvider;
        this.events = events;
        this.beacons = [];
        this.topic = 'light-control';
        this.beacon_major = 49056;
        this.beacon_minor = 47323;
        this.last_update_sent = new Date();
        this.debug_messages = "No Debug Message";
        this.zone = new NgZone({ enableLongStackTrace: false });
        console.log(AWS);
        var config = new AWS.Config({
            credentials: new AWS.Credentials({
                accessKeyId: 'AKIAJSFOA6S76OAXUOVA',
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
    HomePage.prototype.sendCommand = function (command) {
        this.last_update_sent = new Date();
        this.debug_messages = 'sending "' + command + '"';
        this.device.publish(this.getCommand(command), this.handleResult);
    };
    HomePage.prototype.getCommand = function (command) {
        return { topic: this.topic, payload: this.getMessage(command), qos: 0 };
    };
    HomePage.prototype.getMessage = function (message) {
        return JSON.stringify({ message: message });
    };
    HomePage.prototype.handleResult = function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.debug_messages = "Starting to initialize";
            _this.beaconProvider.initialize().then(function (isInitialized) {
                _this.debug_messages = "initialize complete";
                if (isInitialized) {
                    _this.listenToBeaconEvents();
                }
            });
        });
    };
    HomePage.prototype.listenToBeaconEvents = function () {
        var _this = this;
        this.events.subscribe('didRangeBeaconsInRegion', function (data) {
            _this.debug_messages = "got the beacons in region event";
            _this.zone.run(function () {
                var beaconList = data.beacons;
                beaconList.forEach(function (beacon) {
                    if (!_this.isBeaconWeCareAbout(beacon))
                        return;
                    _this.updateBeaconsList(beacon);
                    _this.saveBeaconCurrentRssi();
                    if (_this.beaconMeetsThreshold()) {
                        _this.turnLightOn();
                    }
                    else {
                        _this.turnLightOff();
                    }
                });
            });
        });
    };
    HomePage.prototype.beaconMeetsThreshold = function () {
        var threshold = 78;
        var allPointsOverThreshold = true;
        this.recent_points.forEach(function (point) {
            if (Math.abs(point) >= threshold) {
                allPointsOverThreshold = false;
            }
        });
        return !allPointsOverThreshold;
    };
    HomePage.prototype.turnLightOff = function () {
        if (this.light_is_on) {
            this.light_is_on = false;
            this.sendCommand('off');
        }
    };
    HomePage.prototype.turnLightOn = function () {
        if (!this.light_is_on) {
            this.light_is_on = true;
            this.sendCommand('on');
        }
    };
    HomePage.prototype.saveBeaconCurrentRssi = function () {
        if (this.recent_points.length > 3) {
            this.recent_points.shift();
        }
        this.recent_points.push(this.beacons[0].rssi);
    };
    HomePage.prototype.updateBeaconsList = function (beacon) {
        if (this.beacons.length == 0) {
            this.beacons.push(new BeaconModel(beacon));
        }
        else {
            this.beacons[0].rssi = beacon.rssi;
        }
    };
    HomePage.prototype.canSendUpdate = function () {
        var dateDifference = (new Date()).getTime() - this.last_update_sent.getTime();
        return (dateDifference / 1000.0) > 1.5;
    };
    HomePage.prototype.isBeaconWeCareAbout = function (beacon) {
        return beacon.major == this.beacon_major && beacon.minor == this.beacon_minor;
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, Platform, BeaconProvider, Events])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map