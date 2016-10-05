import { Component } from '@angular/core';
import { Snacks } from './tabs/snacksTab';
import { Drinks } from './tabs/drinksTab';
import { Frozen } from './tabs/frozenTab';

@Component({
  templateUrl: 'pantryList.html'
})
export class pantryList {

  tab1: any;
  tab2: any;
  tab3: any;

  constructor() {
    this.tab1 = Snacks;
    this.tab2 = Drinks;
    this.tab3 = Frozen;
  }
}
