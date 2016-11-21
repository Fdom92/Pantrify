import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { pantryList } from '../pages/pantryList/pantryList';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { Home } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';

import { multiTab } from '../pages/pantryList/multitab/multitab';
import { customTab } from '../pages/pantryList/customTab/customTab';

import { AuthData } from '../providers/auth';

import { RemoveItemModal } from '../pages/pantryList/modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../pages/pantryList/modals/addItemModal/addItemModal';

@NgModule({
  declarations: [
    MyApp,
    pantryList,
    RemoveItemModal,
    AddItemModal,
    Login,
    Signup,
    Menu,
    Home,
    multiTab,
    customTab,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pantryList,
    RemoveItemModal,
    AddItemModal,
    Login,
    Signup,
    Menu,
    Home,
    multiTab,
    customTab,
  ],
  providers: [AuthData]
})
export class AppModule {}
