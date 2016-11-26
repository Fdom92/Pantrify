import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { PantryList } from '../pages/pantryList/pantryList';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { Home } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';
import { Settings } from '../pages/settings/settings';
import { Help } from '../pages/help/help';
import { Feedback } from '../pages/feedback/feedback';
import { Inventory } from '../pages/inventory/inventory';

import { multiTab } from '../components/multitab/multitab';
import { customTab } from '../components/customTab/customTab';

import { UpdateItemModal } from '../modals/updateItemModal/updateItemModal';
import { AddItemModal } from '../modals/addItemModal/addItemModal';


import { MultiPickerModule } from 'ion-multi-picker';

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
    Help,
    Feedback,
    Inventory,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MultiPickerModule //Import MultiPickerModule
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
    Help,
    Feedback,
    Inventory,
  ],
  providers: []
})
export class AppModule {}
