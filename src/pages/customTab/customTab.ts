import { Component } from '@angular/core';

import { ModalController, NavParams, ToastController } from 'ionic-angular';

import { ItemModal } from '../../modals/itemModal/itemModal';
import { FolderModal } from '../../modals/folderModal/folderModal';
import { UserData } from '../../providers/user.provider';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'customTab.html'
})
export class CustomTabPage {

  items : FirebaseListObservable<any[]>;
  type: any;
  folders: any;

  constructor(public modalCtrl: ModalController, 
              public navParams: NavParams, 
              private toastCtrl: ToastController, 
              public translate: TranslateService,
              private _af: AngularFireDatabase,
              private userdata: UserData) {

    this.items = navParams.data;
    this.type = this.items.$ref;
    this.items.subscribe(data => {
       this.folders = data.filter(ele => ele.isFolder === true)
    });
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

  onEditItem(item, key) {
    let editItemModal = this.modalCtrl.create(ItemModal, { type: 'edit', item: item, folders: this.folders });
    editItemModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this.items.remove(key);
        } else {
          if (data.moveFolder !== '') {
            this.items.remove(key);
            this._af.list(this.type + '/' + data.moveFolder.$key + '/products/')
                .push({title: data.title, units: data.units});           
          } else {
            this.items.update(key, {title: data.title, units: data.units});
          }
        }
      }
    });
    editItemModal.present();
  }

  onEditFolder(item, key) {
    let folderModal = this.modalCtrl.create(FolderModal, { type: 'edit' });
    folderModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this.items.remove(key);
        } else {
          this.items.update(key, {title: data.title});
        }
      }
    });
    folderModal.present();  
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

  expandItem(item) {
    this.items.update(item.$key, {expanded: !item.expanded});
  }
}
