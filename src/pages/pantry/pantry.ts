import { UserData } from '../../providers/user.provider';
import { Component, ViewChild } from '@angular/core';

import { ModalController, Tabs } from 'ionic-angular';

import { CustomTabPage } from './../customTab/customTab';
import { AddItemModal } from '../../modals/addItemModal/addItemModal';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TranslateService } from 'ng2-translate';

class Tab {
    icon: string;
    component: any;
    items: FirebaseListObservable<any[]>;
};

@Component({
  templateUrl: 'pantry.html'
})
export class PantryPage {
  @ViewChild('pantryTabs') tabRef: Tabs;
  tabs : Array<Tab>;

  constructor(public userdata: UserData, public modalCtrl: ModalController, public translate: TranslateService, af: AngularFire) {

      this.tabs = [{icon: 'pizza',  component: CustomTabPage, items:  af.database.list('/' + this.userdata.getUid() + '/food')},
              {icon: 'beer',  component: CustomTabPage, items:  af.database.list('/' + this.userdata.getUid() + '/drinks')},
              {icon: 'home',  component: CustomTabPage, items:  af.database.list('/' + this.userdata.getUid() + '/home')}];
  }

    onAdd() {
        let addModal = this.modalCtrl.create(AddItemModal);
        addModal.onDidDismiss(data => {
          let id = this.tabRef.getSelected().id.split('-')[1];
          switch (id) {
            case '0':
              this.tabs[0].items.push(data);
              break;
            case '1':
              this.tabs[1].items.push(data);
              break;
            case '2':
              this.tabs[2].items.push(data);
              break;
            default:
              console.log('Error');            
              break;
          }
        });
        addModal.present();
    }
}
