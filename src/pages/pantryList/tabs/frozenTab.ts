import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { RemoveItemModal } from '../modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../modals/addIemModal/addIemModal';
import { Item } from '../items';

const FrozenItems = [{
  'title': 'Onion',
  'units': 1
},
{
  'title': 'Meat',
  'units': 2
},
{
  'title': 'Fish',
  'units': 1
}];

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Frozen</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>
  <ion-list>
    <ion-item *ngFor="let item of items">
      <h2>{{item.title}}</h2>
      <p>Quantity: {{item.units}}</p>
      <ion-icon name="trash" item-right (click)="onDelete(item)"></ion-icon>
    </ion-item>
  </ion-list>
  <ion-fab right bottom>
     <button ion-fab mini (click)="onAdd()"><ion-icon name="add"></ion-icon></button>
  </ion-fab>
  </ion-content>`
})
export class Frozen {

  items : Array<Item>;

  constructor(public modalCtrl: ModalController) {
    this.items = FrozenItems;
  }

  onDelete(item) {
    let deleteModal = this.modalCtrl.create(RemoveItemModal, { product: item });
    deleteModal.present();
  }

  onAdd() {
    let addModal = this.modalCtrl.create(AddItemModal);
    addModal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        this.items.push(data);
      }
    });
    addModal.present();
  }
}
