import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { IBeacon } from '@ionic-native/ibeacon';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// import { BeaconProvider } from '../providers/beacon-provider';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// class BeaconProviderMock extends BeaconProvider {
//   initialise() {
//     return new Promise((resolve, reject) => {
//       resolve(true);
//     })
//   }
// }

const cloudSettings: CloudSettings = { 'core': { 'app_id': '99c83d18' } };

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    // {provide: BeaconProvider, useClass: BeaconProviderMock},
  ]
})
export class AppModule {}
