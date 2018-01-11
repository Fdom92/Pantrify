import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { ItemModal } from '../../modals/item/item';

import { FirebaseService } from '../../providers/firebase.provider';

const types = {
  food: 0,
  drinks: 1,
  home: 2
};

@Component({
  selector: 'pantry-item',
  templateUrl: 'pantry-item.html'
})
export class PantryItemComponent {

  @Input('item') item;
  @Input('type') type;

  folders: any;

  constructor(private modalCtrl: ModalController, private _fbService: FirebaseService) {
    this.folders = this._fbService.getFolders();
  }

  onAdd(item) {
    this._fbService.updateItem(item, this.type.key,
    { title: item.title, units: parseInt(item.units, 10) + 1 });
  }

  onRemove(item) {
    this._fbService.updateItem(item, this.type.key,
    { title: item.title, units: parseInt(item.units, 10) - 1 });
  }

  onEditItem(item) {
    const editItemModal = this.modalCtrl.create(ItemModal, {
      item,
      type: 'edit',
      folders: this.folders[types[this.type.key]]
    });
    editItemModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this._fbService.removeItem(item, this.type.key);
        } else {
          if (data.moveFolder !== '') {
            this._fbService.removeItem(item, this.type.key);
            this._fbService.pushItemFolder({ title: data.title, units: parseInt(data.units, 10),
              minimum: parseInt(data.minimum, 10) }, this.type.key, data.moveFolder);
          } else {
            this._fbService.updateItem(item, this.type.key,
              { title: data.title, units: parseInt(data.units, 10),
                minimum: parseInt(data.minimum, 10) });
          }
        }
      }
    });
    editItemModal.present();
  }
}
