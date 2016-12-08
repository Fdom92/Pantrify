import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { PantryList } from '../pantryList/pantryList';
import { Settings } from '../settings/settings';
import { Inventory } from '../inventory/inventory';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PantryList;

  pages: Array<{title: string, component: any, icon: string}>;
  pages2: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {
    this.pages = [{ title: 'pantry', component: PantryList, icon: 'home' },
                  { title: 'inventory', component: Inventory, icon: 'clipboard' }];

    this.pages2 = [{ title: 'settings', component: Settings, icon: 'settings' }];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openAsModal(page) {
    this.nav.push(page.component);
  }
}
