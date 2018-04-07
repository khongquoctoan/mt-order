import { PermissionService } from './../common/permission.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from './../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(
        public platform: Platform, public statusBar: StatusBar,
        public splashScreen: SplashScreen, private storage: Storage,
        public events: Events,public permission: PermissionService) {
        this.initializeApp();
        
        this.events.subscribe('user:login', () => {
            console.log('listen event: Login');
            this.rootPage = HomePage;
            // used for an example of ngFor and navigation
            this.pages = [
                { title: 'Home', component: HomePage },
                { title: 'List', component: ListPage },
            ];
        });

        this.events.subscribe('user:logout', () => {
            console.log('listen event: Logout');
            this.rootPage = LoginPage;
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    userLogout(){
        this.storage.clear();
        this.events.publish('user:logout');
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component); 
    }
}
