import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SettingService } from '../common/setting.service';
import { PermissionService } from './../common/permission.service';
import { DataService } from './../services/data.service';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
import { CurrencyVndPipe } from '../pipes/currency-vnd.pipe';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        CurrencyVndPipe
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Contacts,
        SettingService,
        PermissionService,
        DataService,
        Network,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
