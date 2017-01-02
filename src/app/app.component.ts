import { Component, ViewChild }    from '@angular/core';
import { Nav, Platform }           from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage }       from '../pages/home/home';

import {TranslateService} from 'ng2-translate';

@Component({
  templateUrl: '../pages/menu/menu.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  constructor(translate: TranslateService, platform: Platform) {
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    translate.use('en')

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
