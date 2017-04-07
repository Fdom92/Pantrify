import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { LoadingService } from '../../providers/loading.provider';
import { UserData } from '../../providers/user.provider';
import { AddItemModal } from '../../modals/addItemModal/addItemModal';

import { AngularFire } from 'angularfire2';

class ShopItem {
  $key: string;
  title: string;
  units: Number;
  done: boolean;
  type: string;
}

@Component({
  templateUrl: 'shopList.html'
})
export class ShopListPage {

  items: Array<ShopItem> = [];

  constructor(private _loading: LoadingService,
              private _af: AngularFire,
              private userdata: UserData,
              public modalCtrl: ModalController) {
  }

  isAllDone() {
    return this.items.every((element, index, array) => {return element.done});
  }

  addItemsToList(observer, type) {
    observer
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          snapshot.val().units === 0 && this.items.push({$key: snapshot.key, title: snapshot.val().title, units: 1, done: false, type: type});
        });
    });
  }

  generateList() {
    this._loading.present({content: 'Generando tu lista de la compra...', duration: 2000});
    this.addItemsToList(this._af.database.list('/' + this.userdata.getUid() + '/food', { preserveSnapshot: true }), 'food');
    this.addItemsToList(this._af.database.list('/' + this.userdata.getUid() + '/drinks', { preserveSnapshot: true }), 'drinks');
    this.addItemsToList(this._af.database.list('/' + this.userdata.getUid() + '/home', { preserveSnapshot: true }), 'home');
  }

  updateItemsOnPantry(observable, type) {
    this.items.filter((value) => value.type === type).forEach((value) => {
      if (value.$key === '') {
        observable.push({title: value.title, units: value.units});
      } else {
        observable.update(value.$key, { units: value.units });
      }
    });
  }

  finished() {
    this._loading.present({content: 'Añadiendo los productos en la despensa...', duration: 2000});
    this.updateItemsOnPantry(this._af.database.list('/' + this.userdata.getUid() + '/food'), 'food');    
    this.updateItemsOnPantry(this._af.database.list('/' + this.userdata.getUid() + '/drinks'), 'drinks');
    this.updateItemsOnPantry(this._af.database.list('/' + this.userdata.getUid() + '/home'), 'home');
    this.items = [];
  }

  addSingleItem() {
      let addModal = this.modalCtrl.create(AddItemModal, { shop: true });
      addModal.onDidDismiss(data => {
        if (data) {
          this.items.push({$key: '', title: data.title, units: data.units, done: false, type: data.category});
        }
      });
      addModal.present();
  }

  onAdd(item) {
    if (item.units < 999) {
      item.units += 1;
    }
  }

  onRemove(item) {
    if (item.units > 1) {
      item.units -= 1;
    }
  }
}
