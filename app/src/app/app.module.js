var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IBeacon } from '@ionic-native/ibeacon';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeaconProvider } from '../providers/beacon-provider';
import { CloudModule } from '@ionic/cloud-angular';
var cloudSettings = { 'core': { 'app_id': '99c83d18' } };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            IBeacon,
            BeaconProvider,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map