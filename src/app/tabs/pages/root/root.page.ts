import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PantryService } from '../../../shared/services/pantry.service';
import { AddItemPopoverComponent } from '../../../shared/components/add-item-popover/add-item-popover.component';
import { FolderItemModalComponent } from '../../../shared/components/folder-item-modal/folder-item-modal.component';
import { SingleItemModalComponent } from '../../../shared/components/single-item-modal/single-item-modal.component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'root.page.html',
  styleUrls: ['root.page.scss'],
})
export class RootPage implements OnInit {

  userData: any;
  tabSelected: string;

  constructor(
    private popoverController: PopoverController,
    private pantrySvc: PantryService,
    private authService: AuthService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.userData = this.authService.getUser();
  }

  onTabChange(ev) {
    this.tabSelected = ev.tab;
  }

  async onAdd(ev) {
    const popover = await this.popoverController.create({
      component: AddItemPopoverComponent,
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then(response => {
      if (response.data === 'folder') {
        this.onAddFolder();
      }
      if (response.data === 'item') {
        this.onAddItem();
      }
    });
    return await popover.present();
  }

  async onAddItem() {
    const addModal = await this.modalController.create({
      component: SingleItemModalComponent,
      componentProps: {
        type: 'add',
        itemType: this.tabSelected
      }
    });
    addModal.onDidDismiss().then(response => {
      if (response) {
        if (!response.data.moveFolder) {
          this.pantrySvc.pushItem(this.userData.uid, this.tabSelected,
            {
              title: response.data.item.title,
              units: parseInt(response.data.item.units, 10),
              minimum: parseInt(response.data.item.minimum, 10)
            });
        } else {
          this.pantrySvc.pushItemFolder(this.userData.uid, this.tabSelected, response.data.moveFolder,
            {
              title: response.data.item.title,
              units: parseInt(response.data.item.units, 10),
              minimum: parseInt(response.data.item.minimum, 10)
            });
        }
      }
    });
    addModal.present();
  }

  async onAddFolder() {
    const folderModal = await this.modalController.create({
      component: FolderItemModalComponent,
      componentProps: {
        type: 'add',
        itemType: this.tabSelected
      }
    });
    folderModal.onDidDismiss().then(response => {
      if (response) {
        this.pantrySvc.pushItem(this.userData.uid, this.tabSelected,
          {
            title: response.data.item.title,
            isFolder: true,
            expanded: false,
            products: null
          });
      }
    });
    folderModal.present();
  }
}
