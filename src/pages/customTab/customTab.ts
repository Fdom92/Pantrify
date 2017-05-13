import { Component } from '@angular/core';

import { ModalController, NavParams, ToastController } from 'ionic-angular';

import { EditItemModal } from '../../modals/editItemModal/editItemModal';

import { FirebaseListObservable } from 'angularfire2/database';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'customTab.html'
})
export class CustomTabPage {

  items : FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController, 
              public navParams: NavParams, 
              private toastCtrl: ToastController, 
              public translate: TranslateService) {

    this.items = navParams.data;
  }

  onAdd(item, key) {
    let data = { title:item.title, units:parseInt(item.units) + 1 };
    if (data.units <= 999) {
      this.items.update(key, data);
    } else {
      this.presentToast();
    }
  }

  onRemove(item, key) {
    let data = { title:item.title, units:parseInt(item.units) - 1 };
    if (data.units >= 0) {
      this.items.update(key, data);
    }
  }

  onEdit(item, key) {
    let editItemModal = this.modalCtrl.create(EditItemModal, { item: item });
    editItemModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this.items.remove(key);
        } else {
          this.items.update(key, {title: data.title, units: data.units});
        }
      }
    });
    editItemModal.present();
  }

  presentToast() {
    this.translate.get('Error').subscribe( value => {
      let toast = this.toastCtrl.create({
          message: value.addItemMax,
          duration: 3000,
          position: 'bottom'
      });

      toast.present();
    });
  }
}
