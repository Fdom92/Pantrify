import { Component, ViewChild }    from '@angular/core';
import { Nav, Platform }           from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { PantryPage }   from '../pages/pantry/pantry';
import { HomePage }     from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { UserData }     from '../providers/user.provider';

import {TranslateService} from 'ng2-translate';
import { AngularFire }    from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  usermail: String;
  pages: Array<{title: string, component: any, iconMD: string, iconOS: string}>;

  constructor(translate: TranslateService,public platform: Platform, public af: AngularFire, public userdata: UserData) {
    this.initializeApp();

    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    var userLang = navigator.language.split('-')[0];    
    translate.use(userLang);

    // Set sidemenu pages
    this.pages = [{ title: 'pantry', component: PantryPage, iconMD: 'md-home', iconOS: 'ios-home-outline' },
                  { title: 'settings', component: SettingsPage, iconMD: 'md-settings', iconOS: 'ios-settings-outline' }];
    
    // Subscribe to login/logout events
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.userdata.setUserData(auth.auth);
        this.usermail = this.userdata.getEmail();
        this.rootPage = PantryPage;
      } else {
        this.rootPage = HomePage;        
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}