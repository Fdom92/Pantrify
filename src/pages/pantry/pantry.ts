import { Component, ViewChild } from '@angular/core';

import { ModalController, Tabs, NavController, PopoverController } from 'ionic-angular';

import { CustomTabPage } from './../customTab/customTab';
import { ItemModal } from '../../modals/itemModal/itemModal';
import { FolderModal } from '../../modals/folderModal/folderModal';
import { HardwareBackButtonService } from '../../providers/backbutton.provider';
import { UserData } from '../../providers/user.provider';
import { PopoverPage } from './popover';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TranslateService } from '@ngx-translate/core';

class Tab {
    icon: string;
    component: any;
    items: FirebaseListObservable<any[]>;
};

const fbQuery = {
    orderByChild: 'title',
    limitToLast: 15
};

@Component({
  templateUrl: 'pantry.html'
})
export class PantryPage {
  @ViewChild('pantryTabs') tabRef: Tabs;
  
  tabs : Array<Tab>;

  constructor(private _backBtn: HardwareBackButtonService, 
              public userdata: UserData, 
              public modalCtrl: ModalController, 
              public translate: TranslateService,
              public navCtrl: NavController,
              private _af: AngularFireDatabase,
              private popoverCtrl: PopoverController) {

      this.tabs = [{icon: 'pizza',  component: CustomTabPage, items:  _af.list('/' + this.userdata.getUid() + '/food', {query: fbQuery})},
              {icon: 'beer',  component: CustomTabPage, items:  _af.list('/' + this.userdata.getUid() + '/drinks', {query: fbQuery})},
              {icon: 'home',  component: CustomTabPage, items:  _af.list('/' + this.userdata.getUid() + '/home', {query: fbQuery})}];
  }

    onAddItem() {
        let addModal = this.modalCtrl.create(ItemModal, {type: 'add'});
        addModal.onDidDismiss(data => {
            if (data) {
                let id = this.tabRef.getSelected().id.split('-')[1];
                this.tabs[+id].items.push({
                    title: data.title,
                    units: data.units
                });
            }
        });
        addModal.present();
    }

    onAddFolder() {
        let folderModal = this.modalCtrl.create(FolderModal, {type: 'add'});
        folderModal.onDidDismiss(data => {
            if (data) {
                let id = this.tabRef.getSelected().id.split('-')[1];
                this.tabs[+id].items.push({
                        title: data.title,
                        isFolder: true,
                        expanded: false,
                        products: ''
                });
            }
        });
        folderModal.present();
    }

    onAdd() {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.onDidDismiss(data => {
            if (data === 'folder') {
                this.onAddFolder();
            } else {
                this.onAddItem();
            }
        });
        popover.present();
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