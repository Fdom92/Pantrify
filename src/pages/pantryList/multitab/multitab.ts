import { Component } from '@angular/core';
import { customTab } from '../customTab/customTab';
import { ModalController } from 'ionic-angular';
import { HomeItems, DrinkItems, FoodItems} from './data';
import { Item } from '../items';

export class Tab {
    title: string;
    component: any;
    items: Array<Item>;
};

const tabs = [{title: 'FOOD',  component: customTab, items: FoodItems},
              {title: 'HOME',  component: customTab, items: HomeItems},
              {title: 'DRINKS',  component: customTab, items: DrinkItems}];

@Component({
  selector: 'multi-tab',
  templateUrl: 'multitab.html'
})
export class multiTab {
  
  tabs : Array<Tab>;
  constructor(public modalCtrl: ModalController) {
      this.tabs = tabs;
  }
}
