import { PermissionService } from './../common/permission.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from './../pages/login/login';
import { PhotoPage } from '../pages/photo/photo';
import { ContactPage } from '../pages/contact/contact';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    isLogin: boolean = false;
    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(
        public platform: Platform, public statusBar: StatusBar,
        public menuCtrl: MenuController,
        public splashScreen: SplashScreen, private storage: Storage,
        public events: Events, public permission: PermissionService) {

        this.initializeApp();
        this.menuCtrl.enable(false, 'myMenu');

        this.events.subscribe('user:login', () => {
            console.log('listen event: Login');
            this.isLogin = true;
            this.rootPage = HomePage;
            this.menuCtrl.enable(true, 'myMenu');
            // used for an example of ngFor and navigation
            this.pages = [
                { title: 'Home', component: HomePage },
                { title: 'List', component: ListPage },
                { title: 'Contact', component: ContactPage },
                { title: 'Photo', component: PhotoPage },
            ];
        });

        this.events.subscribe('user:logout', () => {
            console.log('listen event: Logout');
            this.isLogin = false;
            this.rootPage = LoginPage;
            this.menuCtrl.enable(false, 'myMenu');
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

    userLogout() {
        this.storage.clear();
        this.events.publish('user:logout');
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    }
}
