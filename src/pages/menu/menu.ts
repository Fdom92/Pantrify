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

  pages: Array<{title: string, component: any, iconMD: string, iconOS: string}>;
  pages2: Array<{title: string, component: any, iconMD: string, iconOS: string}>;

  constructor(public platform: Platform) {
    this.pages = [{ title: 'pantry', component: PantryList, iconMD: 'md-home', iconOS: 'ios-home-outline' },
                  { title: 'inventory', component: Inventory, iconMD: 'md-clipboard', iconOS: 'ios-clipboard-outline' }];

    this.pages2 = [{ title: 'settings', component: Settings, iconMD: 'md-settings', iconOS: 'ios-settings-outline' }];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openAsModal(page) {
    this.nav.push(page.component);
  }
}
