import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { CustomTabPage } from './../customTab/customTab';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TranslateService, LangChangeEvent } from 'ng2-translate';

class Tab {
    title: string;
    component: any;
    items: FirebaseListObservable<any[]>;
};

@Component({
  templateUrl: 'pantry.html'
})
export class PantryPage {

  tabs : Array<Tab>;
  constructor(public modalCtrl: ModalController, public translate: TranslateService, af: AngularFire) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.tabs[0].title = event.translations.Common['tab-food'];
        this.tabs[1].title = event.translations.Common['tab-drinks'];
        this.tabs[2].title = event.translations.Common['tab-home'];
      });

      this.tabs = [{title: 'FOOD',  component: CustomTabPage, items:  af.database.list('/food')},
              {title: 'DRINKS',  component: CustomTabPage, items:  af.database.list('/drinks')},
              {title: 'HOME',  component: CustomTabPage, items:  af.database.list('/home')}];
  }
}
