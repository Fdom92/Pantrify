import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from '../../../shared/popup.service';
import { FolderItemModalComponent } from '../folder-item-modal/folder-item-modal.component';
import { PantryService } from '../../pantry.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.scss'],
})
export class FolderItemComponent implements OnInit {
  @Input() item: any;
  @Input() type: any;

  items: Array<any> = [];
  folder: any;

  userData;
  itemData;

  constructor(private pantrySvc: PantryService, private authSvc: AuthService, private popupSvc: PopupService) {}

  ngOnInit() {
    this.itemData = this.item.payload.val();
    Object.keys(this.itemData.products).forEach(key => {
      this.items.push({
        key,
        title: this.itemData.products[key].title,
        units: this.itemData.products[key].units,
        minimum: this.itemData.products[key].minimum
      });
    });
    this.items.sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    this.folder = this.itemData;
    this.userData = this.authSvc.getUser();
  }

  expandItem() {
    this.pantrySvc.updateFolder(this.userData.uid, this.type, this.item, { expanded: !this.item.expanded });
  }

  onEditFolder() {
    this.popupSvc.openModal({ component: FolderItemModalComponent, componentProps: {type: 'edit'} }).then(modalResult => {
      if (modalResult.data.type === 'edit') {
        this.pantrySvc.updateFolder(this.userData.uid, this.type, this.item, {title: modalResult.data.item.title});
      } else if (modalResult.data.type === 'remove') {
        this.pantrySvc.removeItem(this.userData.uid, this.type, this.item);
      }
    });
  }
}
