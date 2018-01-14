import { Component, ViewChild } from '@angular/core';

import { ModalController, Tabs, NavController, PopoverController } from 'ionic-angular';

import { CustomTabPage } from '../../components/custom-tab/custom-tab';
import { ItemModal } from '../../modals/item/item';
import { FolderModal } from '../../modals/folder/folder';
import { HardwareBackButtonService } from '../../providers/backbutton.provider';
import { PopoverPage } from './popover';
import { FirebaseService } from '../../providers/firebase.provider';

import { FirebaseListObservable } from 'angularfire2/database';

class Tab {
  icon: string;
  component: any;
  items: FirebaseListObservable<any[]>;
}

const type = {
  0: '/food',
  1: '/drinks',
  2: '/home'
};

@Component({
  selector: 'pantry-page',
  templateUrl: 'pantry.html'
})
export class PantryPage {
  @ViewChild('pantryTabs') tabRef: Tabs;

  tabs: Array<Tab>;
  folders: Array<any> = [];

  constructor(private _backBtn: HardwareBackButtonService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private _fbService: FirebaseService,
    private popoverCtrl: PopoverController) {

    this.tabs = [{ icon: 'pizza', component: CustomTabPage, items: this._fbService.getFood() },
    { icon: 'beer', component: CustomTabPage, items: this._fbService.getDrinks() },
    { icon: 'home', component: CustomTabPage, items: this._fbService.getHome() }];

    this.folders = this._fbService.getFolders();
  }

  onAddItem() {
    const id = this.tabRef.getSelected().id.split('-')[1];
    const addModal = this.modalCtrl.create(ItemModal, { type: 'add', folders: this.folders[+id] });
    addModal.onDidDismiss(data => {
      if (data) {
        if (data.moveFolder !== '') {
          this._fbService.pushItemFolder({ title: data.title, units: parseInt(data.units, 10),
            minimum: parseInt(data.minimum, 10) }, type[id], data.moveFolder);
        } else {
          this._fbService.pushItem({ title: data.title, units: parseInt(data.units, 10),
            minimum: parseInt(data.minimum, 10) }, type[+id]);
        }
      }
    });
    addModal.present();
  }

  onAddFolder() {
    const id = this.tabRef.getSelected().id.split('-')[1];
    const folderModal = this.modalCtrl.create(FolderModal, { type: 'add' });
    folderModal.onDidDismiss(data => {
      if (data) {
        this._fbService.pushItem({
          title: data.title,
          isFolder: true,
          expanded: false,
          products: ''
        }, type[+id]);
      }
    });
    folderModal.present();
  }

  onAdd(event) {
    const popover = this.popoverCtrl.create(PopoverPage);
    popover.onDidDismiss(data => {
      if (data === 'folder') {
        this.onAddFolder();
      }
      if (data === 'item') {
        this.onAddItem();
      }
    });
    popover.present({ ev: event });
  }

  ionViewDidEnter() {
    this._backBtn.registerAction(() => {
      this._backBtn.doubleBackToExit();
    });
  }

  ionViewWillLeave() {
    this._backBtn.deregisterAction();
  }
}
