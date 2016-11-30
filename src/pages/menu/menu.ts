import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { PantryList } from '../pantryList/pantryList';
import { Settings } from '../settings/settings';
import { Help } from '../help/help';
import { Feedback } from '../feedback/feedback';
import { Inventory } from '../inventory/inventory';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PantryList;

  pages: Array<{title: string, component: any, icon: string}>;
  pages2: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public translate: TranslateService) {
    this.pages = [{ title: 'Pantry', component: PantryList, icon: 'home' },
                  { title: 'Inventory', component: Inventory, icon: 'clipboard' }];

    this.pages2 = [{ title: 'Settings', component: Settings, icon: 'settings' },
      { title: 'Send feedback', component: Feedback, icon: 'text' },
      { title: 'Help', component: Help, icon: 'help-circle' }];

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.pages[0].title = event.translations.Menu.pantry;
      this.pages[1].title = event.translations.Menu.inventory;
      this.pages2[0].title = event.translations.Menu.settings;
      this.pages2[1].title = event.translations.Menu.sendFeedback;
      this.pages2[2].title = event.translations.Menu.help;
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
