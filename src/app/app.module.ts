import { NgModule } from '@angular/core';
import { Http }     from '@angular/http';

import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp }           from './app.component';
import { PantryPage }      from '../pages/pantry/pantry';
import { LoginPage }       from '../pages/login/login';
import { Menu }            from '../pages/menu/menu';
import { HomePage }        from '../pages/home/home';
import { SignupPage }      from '../pages/signup/signup';
import { SettingsPage }    from '../pages/settings/settings';
import { SettingsPopOver } from './../pages/settings/popover/popover';
import { CustomTabPage }   from '../pages/customTab/customTab';
import { AddItemModal }    from '../modals/addItemModal/addItemModal';
import { FirebaseConfig }  from '../../config/firebase.config';
import { UserData }        from '../providers/user.provider';

import { TranslateStaticLoader, TranslateModule, TranslateLoader} from 'ng2-translate';
import { AngularFireModule } from 'angularfire2';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

let pages = [
  MyApp,
  PantryPage,
  LoginPage,
  SignupPage,
  HomePage,
  SettingsPage,
  CustomTabPage,
  Menu,
  AddItemModal,
  SettingsPopOver
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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: [UserData]
})
export class AppModule {}
