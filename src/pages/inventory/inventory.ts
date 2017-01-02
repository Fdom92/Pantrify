import {Component} from "@angular/core";

import { ModalController, NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AddItemModal } from '../../modals/addItemModal/addItemModal';

@Component({
    templateUrl: "inventory.html"
})
export class InventoryPage {
    food: FirebaseListObservable<any[]>;
    home:FirebaseListObservable<any[]>;
    drink: FirebaseListObservable<any[]>;

    constructor(public modalCtrl: ModalController, public navCtrl: NavController, af: AngularFire) {
      this.food = af.database.list('/food');
      this.home = af.database.list('/home');
      this.drink = af.database.list('/drinks');
    }

    onAdd() {
        let addModal = this.modalCtrl.create(AddItemModal);
        addModal.onDidDismiss(data => {
            if (data) {
                switch(data.category) {
                    case 'food':
                    this.food.push(data);
                    break;

                    case 'drink':
                    this.drink.push(data);
                    break;

                    case 'home':
                    this.home.push(data);
                    break;
                }
            }
        });
        addModal.present();
    }
}
