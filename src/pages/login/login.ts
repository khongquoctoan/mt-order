import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { HomePage } from './../home/home';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    @ViewChild('email') email: any;
    private username: string;
    private password: string;
    isProcess: boolean = false;
    constructor(
        public _navCtrl: NavController,
        public _navParams: NavParams,
        public _events: Events,
        private _storage: Storage,
        private _dataService: DataService) {
        this.username = 'admin@maxtot.com';
        this.password = 'secret';
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.email.setFocus();
        }, 500);
    }

    login(): void {
        // set a key/value
        let params = {
            email: this.username,
            password: this.password
        };
        this.isProcess = true;
        this._dataService.withLoader('Đợi xíu nhé :)');

        this._dataService.post('login', params).subscribe(
            res => {
                // console.log('login response: ', res);
                if (res.success == true) {
                    this._storage.set('curuser', res.data);
                    this._events.publish('user:login');
                    // setTimeout(() => {  //Chuyen huong nhanh se bi loi - popup loading
                    // this._navCtrl.setRoot(HomePage);
                    // }, 500);
                } else {
                    this._dataService.showAlert('Thông báo', res.error);
                }
                this.isProcess = false;
            },
            err => {
                // console.log('err: ', err);
                this.isProcess = false;
                this._dataService.showAlert('Lỗi', 'Kiểm tra lại kết nối !');
            }
        );
    }
}
