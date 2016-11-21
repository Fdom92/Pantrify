import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { RemoveItemModal } from '../modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../modals/addItemModal/addItemModal';
import { Item } from '../items';

@Component({
  templateUrl: 'customTab.html'
})
export class customTab {

  items : Array<Item>;

  constructor(public modalCtrl: ModalController, navParams: NavParams) {
    this.items = navParams.data;
  }

  onDelete(item) {
    let deleteModal = this.modalCtrl.create(RemoveItemModal, { product: item });
    deleteModal.onDidDismiss(data => {
      if (data) {
        let index = this.items.findIndex(x => x.title === data.product.title);
        let result = this.items[index].units - data.units;
        if (result > 0) {
          this.items[index].units = result;
        } else {
          this.items.splice(index, 1);
        }
      }
    });
    deleteModal.present();
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
