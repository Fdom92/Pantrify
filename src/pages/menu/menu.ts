import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';

import { PantryPage }    from '../pantry/pantry';
import { SettingsPage }  from '../settings/settings';
import { UserData } from '../../providers/user.provider';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PantryPage;
  usermail: String;
  pages: Array<{title: string, component: any, iconMD: string, iconOS: string}>;

  constructor(public platform: Platform, public userdata: UserData) {
    this.usermail = this.userdata.getEmail();
    this.pages = [{ title: 'pantry', component: PantryPage, iconMD: 'md-home', iconOS: 'ios-home-outline' },
                  { title: 'settings', component: SettingsPage, iconMD: 'md-settings', iconOS: 'ios-settings-outline' }];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
