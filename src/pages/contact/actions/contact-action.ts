import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'page-contact-action',
    templateUrl: 'contact-action.html',
})
export class ContactActionPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public _viewCtrl: ViewController
    ) {
        // console.log('UserId', navParams.get('userId'));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactPage');
    }
    
    closeModal() {
        this._viewCtrl.dismiss();
    }
}
