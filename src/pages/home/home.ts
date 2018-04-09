import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    pet: string = 'puppies';
    items: Array<{ title: string, img: string }>;

    constructor(public navCtrl: NavController,private contacts: Contacts) {
        this.items = [];
        for (let i = 1; i <= 10; i++) {
            this.items.push({
                title: 'This is item #' + i,
                img: 'img_' + (i % 2 == 0 ? '1' : '2') + '.jpg'
            });
        }
    }

    addContact(){
        let contact: Contact = this.contacts.create();
        
        contact.name = new ContactName(null, 'Smith', 'John');
        contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
        contact.save().then(
          () => console.log('Contact saved!', contact),
          (error: any) => console.error('Error saving contact.', error)
        );
    }

}
