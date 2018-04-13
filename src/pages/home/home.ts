import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
    constructor(
        public _navCtrl: NavController,
        private _localNotifications: LocalNotifications,
        private _contacts: Contacts,
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
        this._localNotifications.schedule({
            id: 1,
            text: 'Single ILocalNotification',
            data: 'test'
        });
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

    addContact() {
        let contact: Contact = this._contacts.create();

        contact.name = new ContactName(null, 'Smith', 'John');
        contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
        contact.save().then(
            () => console.log('Contact saved!', contact),
            (error: any) => console.error('Error saving contact.', error)
        );
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
