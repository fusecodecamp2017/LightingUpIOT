import { Component, NgZone } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { Buffer } from 'buffer';

import { AWSIoTData } from '../../browser';
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
  deviceShadow: any;
  topic: string = 'light-control';

  constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
  	this.debug_messages = "No Debug Message";
    this.zone = new NgZone({ enableLongStackTrace: false });

    var lightPrivateKey = new Buffer(
		'-----BEGIN RSA PRIVATE KEY-----' +
		'MIIEowIBAAKCAQEApsSUYWiVD20xPqowcX5ntKQdsBmlaMuJU8VoxTVSyq7857b7' +
		'Y8WG34mZqTNcPjpHpHyOGEDVgvo+jL8hTluO1PGYJOzTFpcogKyBQiZUkIuTSG8y' +
		'vQIfl12NOsh/hN6j2mRZV3CbfkNZOLgrw9L1W6uDK2Rmo3MTjUMr0WorO+aCSVde' +
		'z+Hamx1bLaPNmnhNB5N43sD+hrqJ62GXqvNjKHQj46xe8/EPC0VSCYSvz4RGU4Nt' +
		'fD27z/xGQ6oJgjQ/250kVbXq2hB0YmyM9F9dMWmrM7zpuCXHYjXZthFffD/bL54s' +
		'uHyw0LkAmjZRmT2rceCHRc5RnK4oVJGu9XagoQIDAQABAoIBADzyVMPwo6E6p6ee' +
		'LQwdRStIWy0zgjb1Q5/g4nRIE5TNNNI+FkuVMcBaGlUy1wBK7knX11pXv3AZomhv' +
		'pW1smpuKG69K+a4k2gGEicyyE2+sAsyTDvjyYLdB0k5sXeYiM8GpsNj652jSljXb' +
		'YOs1GsRAvzRJghU0Bi43ITlsUpaWBLQrkFhlJbvO9Pacf6uY1wHS4+45XJF76CP6' +
		'f7fhio1T8zoWsMVRAtf8RcIjiqA9HAhrD34mWEsJ7j3o2+F8VdOJ7Zk2Neou2VNH' +
		'FGzkjS4Nr5DVDfA03CQ38vB8DOQZKQUZT4A88nJzEjj/funQzuZcP4ZgkP6kwymV' +
		'Zjan/i0CgYEA5KkxGxBbttCu0X0VsfA3OFRPMrJTG6axX9eiDxf9zy1IZ5m/ggLA' +
		'9gb+c9dp7+tSP+7Hsfm/T/yqKYuHB36v5jest8SQ/sjQwAas+MPsZV0JX0MdadDm' +
		'R1l+x9hnAxHhNaHEa4xYTC8dU34ZYfunvZKr/MypCKsiQFmTJHwybUsCgYEAurT6' +
		'fWGDcecXR4sQzcxjRw6s/esLbRQ2QJ7R6QXeU3IIO6x8FGIdNZ5/8n0fsK8bx4Hp' +
		'crVMRtmSNUMC3qyFZPCA4Kc1EjMfiZTqsE+bNZ+8ngAoUJJnrKhbf/PjDzYBmiWP' +
		'Ol/AiK3nr4DYKBGfdKbljeBMnVZtVBc/qEiGUkMCgYEA45YWnxZIAoxwA2fZSRKL' +
		'E5CuhwoAN/xQfNE1poo9f5BViW/4sWEmR3mslwXnlfkFE0cJEXY/WVBk2RbbnbUV' +
		'RDFTwlBt9HlRdF7wmGUBC95u7pbxVpmqKYfE7QnRdbe9DNFmm5jDZYhbSveuMdz1' +
		'FnU+o03cTBlw7NV644yN8EMCgYBmqvpLVAH58n+Eod4drNSy0EkkX8mqs8CZjDwV' +
		'jVqSPFR2rASXGNTDFWN6Ln/son3+GVwL7dIB68ZQb4b2d5vqw62623d9iItBFphv' +
		'V3cb57jKkX+Zvsgv02xtUel8BdCfuSOnj9vJzQdoJMu4TOiINvZoK/01T79SzG3+' +
		'1dK3DQKBgAyEPKAbiGKxvjDk24GkZR2277MSkCqqRQKGjYO6JUQl/Ysgq61bm1ka' +
		'uRIdmt8A8rXAGXYhcZS2LsYyG+dPhMN1vQz6dteItOjewe5jrz4DXGlSV1DDmo/P' +
		'GeM/m/CLX1Ro9kSB1nilol5305om7ZLmz+CuINIuP501Clxsxyn1' +
		'-----END RSA PRIVATE KEY-----', 'utf-8');

    var lightCertificate = new Buffer(
			'-----BEGIN CERTIFICATE-----' +
			'MIIDWTCCAkGgAwIBAgIUIkeC9onkWfdDK4SRiNmNiV6dbwswDQYJKoZIhvcNAQEL' +
			'BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g' +
			'SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTE3MDQxMjIzMTAw' +
			'OVoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0' +
			'ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKbElGFolQ9tMT6qMHF+' +
			'Z7SkHbAZpWjLiVPFaMU1Usqu/Oe2+2PFht+JmakzXD46R6R8jhhA1YL6Poy/IU5b' +
			'jtTxmCTs0xaXKICsgUImVJCLk0hvMr0CH5ddjTrIf4Teo9pkWVdwm35DWTi4K8PS' +
			'9VurgytkZqNzE41DK9FqKzvmgklXXs/h2psdWy2jzZp4TQeTeN7A/oa6iethl6rz' +
			'Yyh0I+OsXvPxDwtFUgmEr8+ERlODbXw9u8/8RkOqCYI0P9udJFW16toQdGJsjPRf' +
			'XTFpqzO86bglx2I12bYRX3w/2y+eLLh8sNC5AJo2UZk9q3Hgh0XOUZyuKFSRrvV2' +
			'oKECAwEAAaNgMF4wHwYDVR0jBBgwFoAUgqCUp84YLZ3L1Z4dBLQPWb97fXwwHQYD' +
			'VR0OBBYEFDfN2EM3nq20xj7NdiI8a29K0CT7MAwGA1UdEwEB/wQCMAAwDgYDVR0P' +
			'AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQA+LTX5Yrq2QFXkfMB4obUrN+1o' +
			'at6host8ZpprgdNHq1xbGeWRsLCJrQX9+rhp2G5Ud4bABhKSLvzwvMtlf+UWW3rz' +
			'e8R5CKqY66l72o+7Il5o9Ln30oASivuDC3WzBzgljpag7m3dYeyBxD7Vkn+3Il12' +
			'DgwlHKXgvui/hGKq8sXWLu8yZNA1GfFOsUOt51Q1UDTuMnPy7TsGECMBmRl/+mbi' +
			'DyBwQNdl9NA8Ca/SzfSJ2F2A9AmmVRkTIkBO7tZ43w0I/WnOKmRlxWLjDkY2A8GD' +
			'1JA5gqzNxTQuYEtCITYvxJAtu/BO6AQzJNO2xxrHR2YMBJzVBuNZLuRYrf8e ' +
			'-----END CERTIFICATE-----', 'utf-8');

    var rootCert = new Buffer(
			'-----BEGIN CERTIFICATE-----' +
			'MIIE0zCCA7ugAwIBAgIQGNrRniZ96LtKIVjNzGs7SjANBgkqhkiG9w0BAQUFADCB' +
			'yjELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQL' +
			'ExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwNiBWZXJp' +
			'U2lnbiwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxW' +
			'ZXJpU2lnbiBDbGFzcyAzIFB1YmxpYyBQcmltYXJ5IENlcnRpZmljYXRpb24gQXV0' +
			'aG9yaXR5IC0gRzUwHhcNMDYxMTA4MDAwMDAwWhcNMzYwNzE2MjM1OTU5WjCByjEL' +
			'MAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQLExZW' +
			'ZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwNiBWZXJpU2ln' +
			'biwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxWZXJp' +
			'U2lnbiBDbGFzcyAzIFB1YmxpYyBQcmltYXJ5IENlcnRpZmljYXRpb24gQXV0aG9y' +
			'aXR5IC0gRzUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvJAgIKXo1' +
			'nmAMqudLO07cfLw8RRy7K+D+KQL5VwijZIUVJ/XxrcgxiV0i6CqqpkKzj/i5Vbex' +
			't0uz/o9+B1fs70PbZmIVYc9gDaTY3vjgw2IIPVQT60nKWVSFJuUrjxuf6/WhkcIz' +
			'SdhDY2pSS9KP6HBRTdGJaXvHcPaz3BJ023tdS1bTlr8Vd6Gw9KIl8q8ckmcY5fQG' +
			'BO+QueQA5N06tRn/Arr0PO7gi+s3i+z016zy9vA9r911kTMZHRxAy3QkGSGT2RT+' +
			'rCpSx4/VBEnkjWNHiDxpg8v+R70rfk/Fla4OndTRQ8Bnc+MUCH7lP59zuDMKz10/' +
			'NIeWiu5T6CUVAgMBAAGjgbIwga8wDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8E' +
			'BAMCAQYwbQYIKwYBBQUHAQwEYTBfoV2gWzBZMFcwVRYJaW1hZ2UvZ2lmMCEwHzAH' +
			'BgUrDgMCGgQUj+XTGoasjY5rw8+AatRIGCx7GS4wJRYjaHR0cDovL2xvZ28udmVy' +
			'aXNpZ24uY29tL3ZzbG9nby5naWYwHQYDVR0OBBYEFH/TZafC3ey78DAJ80M5+gKv' +
			'MzEzMA0GCSqGSIb3DQEBBQUAA4IBAQCTJEowX2LP2BqYLz3q3JktvXf2pXkiOOzE' +
			'p6B4Eq1iDkVwZMXnl2YtmAl+X6/WzChl8gGqCBpH3vn5fJJaCGkgDdk+bW48DW7Y' +
			'5gaRQBi5+MHt39tBquCWIMnNZBU4gcmU7qKEKQsTb47bDN0lAtukixlE0kF6BWlK' +
			'WE9gyn6CagsCqiUXObXbf+eEZSqVir2G3l6BFoMtEMze/aiCKm0oHw0LxOXnGiYZ' +
			'4fQRbxC1lfznQgUy286dUV4otp6F01vvpX1FQHKOtw5rDgb7MzVIcbidJ4vEZV8N' +
			'hnacRHr2lVz2XTIIM6RUthg/aFzyQkqFOFSDX9HoLPKsEdao7WNq' +
			'-----END CERTIFICATE-----', 'utf-8');

    this.deviceShadow = new AWSIoTData.thingShadow({
	    privateKey: lightPrivateKey,
	    clientCert: lightCertificate,
	    caCert: rootCert,
	    clientId: 'arn:aws:iot:us-east-1:358646606333:thing',
	    region: 'us-east-1',
	    host: 'a1vb512hpb4stb.iot.us-east-1.amazonaws.com'
	  });

	// this.client = MqttClient(() => {
	//     const url = v4.createPresignedURL(
	//         'GET',
	//         AWS_IOT_ENDPOINT_HOST.toLowerCase(),
	//         '/mqtt',
	//         'iotdevicegateway',
	//         crypto.createHash('sha256').update('', 'utf8').digest('hex'),
	//         {
	//             'key': AWS_ACCESS_KEY,
	//             'secret': AWS_SECRET_ACCESS_KEY,
	//             'protocol': 'wss',
	//             'expires': 15
	//         }
	//     );

	//     return new WebSocket(url, [ 'mqttv3.1' ]);
	// });

	// this.client.on('connect', () => { this.handleConnect(); });
  }

  // handleConnect() {
  // 	this.isConnected = true;
  // 	this.debug_messages = 'Connected To Device Shadow';
  // }

  // handleStatus(thingName, stat, clientToken, stateObject) {
  //   this.debug_messages = 'received ' + stat + ' on ' + thingName + ': ' + JSON.stringify(stateObject);
  // }

  sendCommand(command) {
  //   this.debug_messages = 'sending "' + command +'"';
  // 	this.client.publish(this.MQTT_TOPIC, this.getMessage(command));
  //   // this.deviceShadow.publish('light-control', this.getMessage(command));
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