import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    pet: string = 'puppies';
    items: Array<{ title: string, img: string }>;

    constructor(public navCtrl: NavController) {
        this.items = [];
        for (let i = 1; i <= 10; i++) {
            this.items.push({
                title: 'This is item #' + i,
                img: 'img_' + (i % 2 == 0 ? '1' : '2') + '.jpg'
            });
        }
    }

}
