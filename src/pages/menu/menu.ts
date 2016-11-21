import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { PantryList } from '../pantryList/pantryList';
import { Settings } from '../settings/settings';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PantryList;

  pages: Array<{title: string, component: any, icon: string}>;
  pages2: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {
    this.pages = [{ title: 'Pantry', component: PantryList, icon: 'home' }];

    this.pages2 = [{ title: 'Settings', component: Settings, icon: 'settings' },
      { title: 'Send feedback', component: Settings, icon: 'text' },
      { title: 'Help', component: Settings, icon: 'help-circle' }];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
