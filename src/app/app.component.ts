import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { PantryPage } from '../pages/pantry/pantry';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { ShopListPage } from '../pages/shopList/shopList';
import { UserData } from '../providers/user.provider';

import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  usermail: String;
  pages: Array<{ title: string, component: any, iconMD: string, iconOS: string }>;

  constructor(public platform: Platform, 
              public translate: TranslateService,
              public userData: UserData,
              public splashScreen: SplashScreen, 
              public statusBar: StatusBar,
              private _auth: AngularFireAuth) {

    this.initialize();
  }

  initialize() {
    this.platform.ready().then(() => {
      this.getInitialPageToLoad().then((page) => {
        this.rootPage = page;

        this.translate.setDefaultLang('en');
        var userLang = navigator.language.split('-')[0];
        this.translate.use(userLang);

        // Set sidemenu pages
        this.pages = [
          { title: 'pantry', component: PantryPage, iconMD: 'md-home', iconOS: 'ios-home-outline' },
          { title: 'shop', component: ShopListPage, iconMD: 'md-cart', iconOS: 'ios-cart-outline' },
          { title: 'settings', component: SettingsPage, iconMD: 'md-settings', iconOS: 'ios-settings-outline' }
        ];

        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    });
  }


  getInitialPageToLoad() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this._auth.authState.subscribe(user => {
        if (user) {
          this.userData.setUserData({email: user.email, uid: user.uid});
          this.usermail = user.email;
          resolve(PantryPage);
          unsubscribe.unsubscribe();
        } else {
          resolve(HomePage);
          unsubscribe.unsubscribe();
        }
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}