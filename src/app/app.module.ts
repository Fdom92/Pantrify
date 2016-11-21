import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { PantryList } from '../pages/pantryList/pantryList';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { Home } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';
import { Settings } from '../pages/settings/settings';

import { multiTab } from '../pages/pantryList/multitab/multitab';
import { customTab } from '../pages/pantryList/customTab/customTab';

import { RemoveItemModal } from '../pages/pantryList/modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../pages/pantryList/modals/addItemModal/addItemModal';

@NgModule({
  declarations: [
    MyApp,
    PantryList,
    RemoveItemModal,
    AddItemModal,
    Login,
    Signup,
    Menu,
    Home,
    multiTab,
    customTab,
    Settings,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PantryList,
    RemoveItemModal,
    AddItemModal,
    Login,
    Signup,
    Menu,
    Home,
    multiTab,
    customTab,
    Settings,
  ],
  providers: []
})
export class AppModule {}
