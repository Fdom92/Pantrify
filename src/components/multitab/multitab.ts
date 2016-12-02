import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { customTab } from '../customTab/customTab';
import { ModalController } from 'ionic-angular';
import { HomeItems, DrinkItems, FoodItems} from '../../providers/data';
import { Item } from '../../classes/items';

export class Tab {
    title: string;
    component: any;
    items: Array<Item>;
};

const tabs = [{title: 'FOOD',  component: customTab, items: FoodItems},
              {title: 'DRINKS',  component: customTab, items: DrinkItems},
              {title: 'HOME',  component: customTab, items: HomeItems}];

@Component({
  selector: 'multi-tab',
  templateUrl: 'multitab.html'
})
export class multiTab {
  
  tabs : Array<Tab>;
  constructor(public modalCtrl: ModalController, public translate: TranslateService) {
      this.tabs = tabs;

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.tabs[0].title = event.translations.Common['tab-food'];
        this.tabs[1].title = event.translations.Common['tab-drinks'];
        this.tabs[2].title = event.translations.Common['tab-home'];
      });
  }
}
