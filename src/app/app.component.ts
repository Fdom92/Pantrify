import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { StatusBar } from 'ionic-native';
import { Home } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  constructor(public platform: Platform, public translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
