import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { pantryList } from '../pages/pantryList/pantryList';
import { Snacks } from '../pages/pantryList/tabs/snacksTab';
import { Drinks } from '../pages/pantryList/tabs/drinksTab';
import { Frozen } from '../pages/pantryList/tabs/frozenTab';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';

import { RemoveItemModal } from '../pages/pantryList/modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../pages/pantryList/modals/addItemModal/addItemModal';

@NgModule({
  declarations: [
    MyApp,
    pantryList,
    Snacks,
    Drinks,
    Frozen,
    RemoveItemModal,
    AddItemModal,
    Login,
    Home,
    Signup,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pantryList,
    Snacks,
    Drinks,
    Frozen,
    RemoveItemModal,
    AddItemModal,
    Login,
    Home,
    Signup,
  ],
  providers: []
})
export class AppModule {}
