import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { RemoveItemModal } from '../modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../modals/addItemModal/addItemModal';
import { Item } from '../items';

const DrinksItems = [{
  'title': '7up',
  'units': 1
},
{
  'title': 'Coke',
  'units': 4
},
{
  'title': 'Pepsi',
  'units': 2
}];

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Drinks</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>
  <ion-list>
    <ion-item *ngFor="let item of items">
      <h2>{{item.title}}</h2>
      <p>Quantity: {{item.units}}</p>
      <ion-icon name="trash" item-right color="md-blue" (click)="onDelete(item)"></ion-icon>
    </ion-item>
  </ion-list>
  <ion-fab right bottom>
     <button ion-fab mini (click)="onAdd()"><ion-icon name="add"></ion-icon></button>
  </ion-fab>
  </ion-content>`
})
export class Drinks {

  items : Array<Item>;

  constructor(public modalCtrl: ModalController) {
    this.items = DrinksItems;
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
