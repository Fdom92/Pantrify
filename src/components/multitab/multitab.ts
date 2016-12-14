import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { customTab } from '../customTab/customTab';
import { ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

export class Tab {
    title: string;
    component: any;
    items: FirebaseListObservable<any[]>;
};

@Component({
  selector: 'multi-tab',
  templateUrl: 'multitab.html'
})
export class multiTab {

  tabs : Array<Tab>;
  constructor(public modalCtrl: ModalController, public translate: TranslateService, af: AngularFire) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.tabs[0].title = event.translations.Common['tab-food'];
        this.tabs[1].title = event.translations.Common['tab-drinks'];
        this.tabs[2].title = event.translations.Common['tab-home'];
      });

      this.tabs = [{title: 'FOOD',  component: customTab, items:  af.database.list('/food')},
              {title: 'DRINKS',  component: customTab, items:  af.database.list('/drinks')},
              {title: 'HOME',  component: customTab, items:  af.database.list('/home')}];
  }
}