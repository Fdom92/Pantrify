import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateStaticLoader, TranslateModule, TranslateLoader} from 'ng2-translate';
import { AngularFireModule } from 'angularfire2';
import { MultiPickerModule } from 'ion-multi-picker';

import { MyApp } from './app.component';
import { PantryList } from '../pages/pantryList/pantryList';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { Home } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';
import { Settings } from '../pages/settings/settings';
import { SettingsPopOver } from '../pages/settings/popover/settings.popover';
import { Inventory } from '../pages/inventory/inventory';

import { multiTab } from '../components/multitab/multitab';
import { customTab } from '../components/customTab/customTab';

import { UpdateItemModal } from '../modals/updateItemModal/updateItemModal';
import { AddItemModal } from '../modals/addItemModal/addItemModal';

import { FirebaseConfig } from '../../config/firebase.config';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    PantryList,
    UpdateItemModal,
    AddItemModal,
    Login,
    Signup,
    Menu,
    Home,
    multiTab,
    customTab,
    Settings,
    SettingsPopOver,
    Inventory,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    MultiPickerModule, //Import MultiPickerModule
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PantryList,
    UpdateItemModal,
    AddItemModal,
    Login,
    Signup,
    Menu,
    Home,
    multiTab,
    customTab,
    Settings,
    SettingsPopOver,
    Inventory,
  ],
  providers: []
})
export class AppModule {}
