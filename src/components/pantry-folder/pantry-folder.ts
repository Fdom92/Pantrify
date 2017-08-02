import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { FolderModal } from '../../modals/folder/folder';
import { FirebaseService } from '../../providers/firebase.provider';

@Component({
  selector: 'pantry-folder',
  templateUrl: 'pantry-folder.html'
})
export class PantryFolderComponent {

  @Input('item') item;
  @Input('type') type;

  constructor(private modalCtrl: ModalController, private _fbService: FirebaseService) {
  }

  onEditFolder() {
    const folderModal = this.modalCtrl.create(FolderModal, { type: 'edit' });
    folderModal.onDidDismiss(data => {
      if (data) {
        if (data.type === 'remove') {
          this._fbService.removeItem(this.item, this.type.key);
        } else {
          this._fbService.updateFolder(this.item, this.type.key, { title: data.title });
        }
      }
    });
    folderModal.present();
  }

  expandItem(item) {
    this._fbService.updateFolder(item, this.type.key, { expanded: !item.expanded });
  }
}
