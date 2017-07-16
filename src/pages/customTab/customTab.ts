import { Component } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

import { ItemModal } from '../../modals/itemModal/itemModal';
import { FolderModal } from '../../modals/folderModal/folderModal';
import { FirebaseService } from '../../providers/firebase.provider';

import { FirebaseListObservable } from 'angularfire2/database';

const types = {
    'food': 0,
    'drinks': 1,
    'home': 2
};

@Component({
  templateUrl: 'customTab.html'
})
export class CustomTabPage {

  items : FirebaseListObservable<any[]>;
  type: any;
  folders: any;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, 
              private _fbService: FirebaseService) {

    this.items = navParams.data;
    this.type = this.items.$ref;
    this.folders = this._fbService.getFolders();
  }

  onAdd(item, key) {
    this._fbService.updateItem(item, this.type.key, { title: item.title, units: parseInt(item.units) + 1 });
  }

  onRemove(item, key) {
    this._fbService.updateItem(item, this.type.key, { title: item.title, units: parseInt(item.units) - 1 });
  }

  onEditItem(item, key) {
    let editItemModal = this.modalCtrl.create(ItemModal, { type: 'edit', item: item, 
                                                           folders: this.folders[types[this.type.key]] });
    editItemModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this._fbService.removeItem(item, this.type.key);
        } else {
          if (data.moveFolder !== '') {
            this._fbService.removeItem(item, this.type.key);
            this._fbService.pushItemFolder({title: data.title, units: data.units}, 
                                            this.type.key, data.moveFolder);        
          } else {
            this._fbService.updateItem(item, this.type.key, {title: data.title, units: data.units});
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
          this._fbService.removeItem(item, this.type.key);
        } else {
          this._fbService.updateFolder(item, this.type.key, {title: data.title});
        }
      }
    });
    folderModal.present();  
  }

  expandItem(item) {
    this.items.update(item.$key, {expanded: !item.expanded});
  }
}