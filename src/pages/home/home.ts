import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CallNumber } from '@ionic-native/call-number';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    productGroup: string = 'newest';
    items: Array<{ title: string, img: string }>;
    dataHome: any = { 'newest': [] };
    loading: any = { 'newest': false, 'bestseller': false };
    allContacts: any = {};

    constructor(
        public _navCtrl: NavController,
        public _actionSheetCtrl: ActionSheetController,
        private _localNotifications: LocalNotifications,
        private _callNumber: CallNumber,
        private _dataService: DataService
    ) {
        this.items = [];
        for (let i = 1; i <= 10; i++) {
            this.items.push({
                title: 'This is item #' + i,
                img: 'img_' + (i % 2 == 0 ? '1' : '2') + '.jpg'
            });
        }
        this.loadListProduct();
    }

    ionViewDidLoad() {
        // this._localNotifications.schedule({
        //     id: 1,
        //     text: 'Single ILocalNotification',
        //     data: 'test'
        // });
    }

    loadListProduct() {
        this.loading.newest = true;
        this._dataService.post('product/newest', {}).subscribe(
            res => {
                // console.log('Response: ', res);
                if (res.status == 'success') {
                    this.dataHome['newest'] = res.data;
                }
                this.loading.newest = false;
                // console.log(this.dataHome['newest']);
            },
            err => {
                console.log('err: ', err);
            }
        );
    }

    onSegmentChanged($event) {
        // console.log($event);
        if ($event.value == 'contactlist') {
            if (typeof this.dataHome['contactlist'] == 'undefined')
                this.dataHome['contactlist'] = [];
        }
    }

    presentActionSheet() {
        let actionSheet = this._actionSheetCtrl.create({
            title: 'Demo actions',
            buttons: [
                {
                    text: 'Hiển thị Notify',
                    handler: () => {
                        this.showNotification();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }


    showNotification() {
        let infoNotify: any = {
            title: 'Example',
            text: 'Đây là ví dụ về thông báo mới1',
            data: { 'id': 'value' }
        };
        this._localNotifications.schedule(infoNotify);
    }

}
