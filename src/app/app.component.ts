import { PantryPage } from '../pages/pantry/pantry';
import { Component, ViewChild }    from '@angular/core';
import { Nav, Platform }                from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Menu }     from '../pages/menu/menu';
import { UserData } from '../providers/user.provider';

import {TranslateService} from 'ng2-translate';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  constructor(translate: TranslateService, platform: Platform, public af: AngularFire, public userdata: UserData) {

    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    
    var userLang = navigator.language.split('-')[0];    
    translate.use(userLang);

    this.af.auth.subscribe(auth => {
      if (!auth) {
        this.userdata.setUserData(auth.auth);
        console.log('logado');
        this.nav.setRoot(Menu);
      } else {
        console.log('deslogado');
        this.nav.setRoot(HomePage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
