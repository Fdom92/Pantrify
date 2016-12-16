import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: 'customTab.html'
})
export class customTab {

  items : FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController, navParams: NavParams) {
    this.items = navParams.data;
  }

  onAdd(item, key) {
    let data = { title:item.title, units:item.units + 1 };
    this.items.update(key, data);
  }

  onRemove(item, key) {
    let data = { title:item.title, units:item.units - 1 };
    if (data.units === 0) {
      this.items.remove(key);
    } else {
      this.items.update(key, data);
    }
  }
}
