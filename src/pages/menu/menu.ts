import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { pantryList } from '../pantryList/pantryList';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = pantryList;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: pantryList, icon: 'list' },
      { title: 'Settings', component: pantryList, icon: 'settings' }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
