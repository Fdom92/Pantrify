import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupService } from '../../../shared/popup.service';
import { SingleItemModalComponent } from '../single-item-modal/single-item-modal.component';
import { PantryService } from '../../pantry.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss'],
})
export class SingleItemComponent implements OnInit {
  @Input() item: any;
  @Input() type: any;
  @Input() folder: any;

  userData;
  itemData;

  constructor(
    private pantrySvc: PantryService,
    private authSvc: AuthService,
    private popSvc: PopupService,
    private translateSvc: TranslateService,
    private popupSvc: PopupService) {
    }

  ngOnInit() {
    this.userData = this.authSvc.getUser();
    this.itemData = this.item.payload.val();
  }

  onEditItem(item) {
    this.popupSvc.openModal({
      component: SingleItemModalComponent,
      componentProps: { type: 'edit', item, folders: this.getCurrentFolders() }
    }).then(modalResult => {
      if (modalResult.data.type === 'edit') {
        if (!modalResult.data.moveToFolder) {
        this.pantrySvc.updateItem(this.userData.uid, this.type, item.key,
          { title: modalResult.data.item.title,
            units: parseInt(modalResult.data.item.units, 10),
            minimum: parseInt(modalResult.data.item.minimum, 10) });
        } else {
          this.pantrySvc.removeItem(this.userData.uid, this.type, item.key);
          this.pantrySvc.pushItemFolder(this.userData.uid, this.type, modalResult.data.moveToFolder,
            {
              title: modalResult.data.item.title,
              units: parseInt(modalResult.data.item.units, 10),
              minimum: parseInt(modalResult.data.item.minimum, 10)
            });
        }
      } else if (modalResult.data.type === 'remove') {
        this.pantrySvc.removeItem(this.userData.uid, this.type, this.item);
      }
    });
  }

  onAdd(item) {
    if ((parseInt(this.itemData.units, 10) + 1) <= 999) {
      if (this.folder) {
        this.pantrySvc.updateItemFromFolder(this.userData.uid, this.type, this.folder, item.key,
          { title: this.itemData.title, units: parseInt(this.itemData.units, 10) + 1, minimum: this.itemData.minimum });
      } else {
        this.pantrySvc.updateItem(this.userData.uid, this.type, item.key,
          { title: this.itemData.title, units: parseInt(this.itemData.units, 10) + 1, minimum: this.itemData.minimum });
      }
    } else {
      this.translateSvc.get('Error').subscribe(translation => {
        this.popSvc.simpleToast(translation.addItemMax, 'bottom', 3000);
      });
    }
  }

  onRemove(item) {
    if ((parseInt(this.itemData.units, 10) - 1) >= 0) {
      if (this.folder) {
        this.pantrySvc.updateItemFromFolder(this.userData.uid, this.type, this.folder, item.key,
          { title: this.itemData.title, units: parseInt(this.itemData.units, 10) - 1, minimum: this.itemData.minimum });
      } else {
        this.pantrySvc.updateItem(this.userData.uid, this.type, item.key,
          { title: this.itemData.title, units: parseInt(this.itemData.units, 10) - 1, minimum: this.itemData.minimum });
      }
    } else {
      this.translateSvc.get('Error').subscribe(translation => {
        this.popSvc.simpleToast(translation.removeItemMin, 'bottom', 3000);
      });
    }
  }

  getCurrentFolders() {
    // let folders;
    switch (this.type) {
      case 'food':
        // folders = this.pantrySvc.foodFolders$;
        break;
      case 'drinks':
        // folders = this.pantrySvc.drinkFolders$;
        break;
      case 'home':
        // folders = this.pantrySvc.homeFolders$;
        break;
      default:
        break;
    }
    return [];
  }
}
