var BeaconModel = (function () {
    function BeaconModel(beacon) {
        this.beacon = beacon;
        this.uuid = beacon.uuid;
        this.major = beacon.major;
        this.minor = beacon.minor;
        this.rssi = beacon.rssi;
    }
    return BeaconModel;
}());
export { BeaconModel };
//# sourceMappingURL=beacon-model.js.map