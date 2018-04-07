import { PermissionService } from './../../common/permission.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    @ViewChild('email') email: any;
    private username: string;
    private password: string;
    private error: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public permission: PermissionService,
        public events: Events,
        private storage: Storage) {

        // if (this.permission.checkLogin() == true) {
        //     this.navCtrl.setRoot(HomePage);
        // }
        
        this.username = 'khongtoan.71@gmail.com';
        this.password = '123';
        this.error = '';
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
        setTimeout(() => {
            this.email.setFocus();
        }, 500);
    }


    login(): void {
        // set a key/value
        this.storage.set('access_token', 'Login ok');
        this.events.publish('user:login');
        this.navCtrl.setRoot(HomePage);
        // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        
        // Or to get a key/value pair
        // this.storage.get('age').then((val) => {
        //     console.log('Your age is', val);
        // });
        /*this.oauthService.createAndSaveNonce().then(nonce => {
            const authClient = new OktaAuth({
                clientId: this.oauthService.clientId,
                redirectUri: this.oauthService.redirectUri,
                url: 'https://dev-[dev-id].oktapreview.com',
                issuer: this.oauthService.issuer
            });
            return authClient.signIn({
                username: this.username,
                password: this.password
            }).then((response) => {
                if (response.status === 'SUCCESS') {
                    return authClient.token.getWithoutPrompt({
                        nonce: nonce,
                        responseType: ['id_token', 'token'],
                        sessionToken: response.sessionToken,
                        scopes: this.oauthService.scope.split(' ')
                    })
                        .then((tokens) => {
                            // oauthService.processIdToken doesn't set an access token
                            // set it manually so oauthService.authorizationHeader() works
                            localStorage.setItem('access_token', tokens[1].accessToken);
                            this.oauthService.processIdToken(tokens[0].idToken, tokens[1].accessToken);
                            this.navCtrl.push(TabsPage);
                        });
                } else {
                    throw new Error('We cannot handle the ' + response.status + ' status');
                }
            }).fail((error) => {
                console.error(error);
                this.error = error.message;
            });
        });*/
    }

    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Use this lightsaber?',
            message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
            buttons: [
                {
                    text: 'Hủy',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Đồng ý',
                    handler: () => {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    }
}
