import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PantryPage } from '../pages/pantry/pantry';
import { PopoverPage } from '../pages/pantry/popover';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ShopListPage } from '../pages/shopList/shopList';
import { SettingsPage } from '../pages/settings/settings';
import { ItemModal } from '../modals/item/item';
import { ShopItemModal } from '../modals/shop-item/shop-item';
import { FolderModal } from '../modals/folder/folder';
import { UserData } from '../providers/user.provider';
import { HardwareBackButtonService } from '../providers/backbutton.provider';
import { FirebaseService } from '../providers/firebase.provider';
import { LoadingService } from '../providers/loading.provider';
import { AlertService } from '../providers/alert.provider';
import { firebaseConfig } from '../config/firebase.config';
import { CustomTabPage } from '../components/custom-tab/custom-tab';
import { FolderItemComponent } from '../components/folder-item/folder-item';
import { ShopListItemComponent } from '../components/shoplist-item/shoplist-item';
import { PantryItemComponent } from '../components/pantry-item/pantry-item';
import { PantryFolderComponent } from '../components/pantry-folder/pantry-folder';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// AoT requires an exported function for factories
export function httpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const pages = [
  MyApp,
  PantryPage,
  PopoverPage,
  LoginPage,
  SignupPage,
  HomePage,
  SettingsPage,
  CustomTabPage,
  ItemModal,
  ShopItemModal,
  FolderModal,
  ShopListPage,
  FolderItemComponent,
  ShopListItemComponent,
  PantryItemComponent,
  PantryFolderComponent
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

@NgModule({
  declarations: declarations(),
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: [UserData, SplashScreen, StatusBar,
    HardwareBackButtonService, LoadingService, AlertService, FirebaseService]
})
export class AppModule { }
