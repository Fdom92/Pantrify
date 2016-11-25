import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { UpdateItemModal } from '../../../modals/updateItemModal/updateItemModal';
import { AddItemModal } from '../../../modals/addItemModal/addItemModal';
import { Item } from '../items';

@Component({
  templateUrl: 'customTab.html'
})
export class customTab {

  items : Array<Item>;

  constructor(public modalCtrl: ModalController, navParams: NavParams) {
    this.items = navParams.data;
  }

  updateItem(item) {
    let updateModal = this.modalCtrl.create(UpdateItemModal, { product: item });
    updateModal.onDidDismiss(data => {
      if (data) {
        let index = this.items.findIndex(x => x.title === data.product.title);
        this.items[index].units = data.units;
        if (this.items[index].units < 1) {
          this.items.splice(index, 1);
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
