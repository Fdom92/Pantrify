import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { UpdateItemModal } from '../../modals/updateItemModal/updateItemModal';
import { AddItemModal } from '../../modals/addItemModal/addItemModal';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: 'customTab.html'
})
export class customTab {

  items : FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController, navParams: NavParams) {
    this.items = navParams.data;
  }

  updateItem(item, key) {
    let updateModal = this.modalCtrl.create(UpdateItemModal, { product: item });
    updateModal.onDidDismiss(data => {
      if (data) {
        if (data.units === 0) {
          this.items.remove(key); 
        } else {
          let newItem = {title: data.product.title, units: data.units};
          this.items.update(key, newItem);
        }
      }
    });
    updateModal.present();
  }

  onAdd() {
    let addModal = this.modalCtrl.create(AddItemModal);
    addModal.onDidDismiss(data => {
      if (data) {
        this.items.push(data);
      }
    });
    addModal.present();
  }
}
