import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';

import { PantryPage }    from '../pantry/pantry';
import { SettingsPage }  from '../settings/settings';
import { InventoryPage } from '../inventory/inventory';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PantryPage;

  pages: Array<{title: string, component: any, iconMD: string, iconOS: string}>;
  pages2: Array<{title: string, component: any, iconMD: string, iconOS: string}>;

  constructor(public platform: Platform) {
    this.pages = [{ title: 'pantry', component: PantryPage, iconMD: 'md-home', iconOS: 'ios-home-outline' },
                  { title: 'inventory', component: InventoryPage, iconMD: 'md-clipboard', iconOS: 'ios-clipboard-outline' }];

    this.pages2 = [{ title: 'settings', component: SettingsPage, iconMD: 'md-settings', iconOS: 'ios-settings-outline' }];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openAsModal(page) {
    this.nav.push(page.component);
  }
}
