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
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { HttpModule } from '@angular/http';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Network } from '@ionic-native/network';
import { CurrencyVndPipe } from '../pipes/currency-vnd.pipe';
import { PhotoPage } from '../pages/photo/photo';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        PhotoPage,
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
        PhotoPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Contacts,
        PhotoLibrary,
        LocalNotifications,
        SettingService,
        PermissionService,
        DataService,
        Network,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
