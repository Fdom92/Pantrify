import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { ItemModal } from '../../modals/itemModal/itemModal';
import { FirebaseService } from '../../providers/firebase.provider';

const types = {
  food: 0,
  drinks: 1,
  home: 2
};

@Component({
  selector: 'folder-item',
  templateUrl: 'folderItem.html'
})
export class FolderItemComponent implements OnInit {

  @Input('products') products;
  @Input('type') type;
  @Input('folder') folder;

  items: Array<any> = [];
  folders: Array<any> = [];

  constructor(public modalCtrl: ModalController, private _fbService: FirebaseService) { }

  ngOnInit() {
    Object.keys(this.products).forEach(key => {
      this.items.push({
        $key: key,
        title: this.products[key].title,
        units: this.products[key].units
      });
    });
    this.folders = this._fbService.getFolders();
  }

  onAdd(item, key, event) {
    event.stopPropagation();
    this._fbService.updateItemFolder(item, this.type,
      { title: item.title, units: parseInt(item.units, 10) + 1 }, this.folder);
  }

  onRemove(item, key, event) {
    event.stopPropagation();
    this._fbService.updateItemFolder(item, this.type,
      { title: item.title, units: parseInt(item.units, 10) - 1 }, this.folder);
  }

  onEdit(item, key, event) {
    event.stopPropagation();
    const editItemModal = this.modalCtrl.create(ItemModal, {
      item,
      type: 'edit',
      folders: this.folders[types[this.type]]
    });
    editItemModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this._fbService.removeItemFolder(item, this.type, this.folder);
        } else {
          if (data.moveFolder !== '') {
            this._fbService.removeItemFolder(item, this.type, this.folder);
            this._fbService.pushItemFolder({ title: data.title, units: data.units },
              this.type, data.moveFolder);
          } else {
            this._fbService.updateItemFolder(item, this.type,
              { title: data.title, units: data.units }, this.folder);
          }
        }
      }
    });
    editItemModal.present();
  }
}
