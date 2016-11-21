import { Component } from '@angular/core';
import { customTab } from '../customTab/customTab';
import { ModalController } from 'ionic-angular';
import { DrinksItems, FrozenItems, SnacksItems} from './data';
import { Item } from '../items';

export class Tab {
    title: string;
    component: any;
    items: Array<Item>;
};

const tabs = [{title: 'Snacks',  component: customTab, items: SnacksItems},
              {title: 'Drinks',  component: customTab, items: DrinksItems},
              {title: 'Frozen',  component: customTab, items: FrozenItems}];

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
