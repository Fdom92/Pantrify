import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { pantryList } from '../pages/pantryList/pantryList';
import { Snacks } from '../pages/pantryList/tabs/snacksTab';
import { Drinks } from '../pages/pantryList/tabs/drinksTab';
import { Frozen } from '../pages/pantryList/tabs/frozenTab';

import { RemoveItemModal } from '../pages/pantryList/modals/removeItemModal/removeItemModal';
import { AddItemModal } from '../pages/pantryList/modals/addItemModal/addItemModal';

import { numberSelector } from '../pages/pantryList/components/numberSelector/numberSelector';

@NgModule({
  declarations: [
    MyApp,
    pantryList,
    Snacks,
    Drinks,
    Frozen,
    RemoveItemModal,
    AddItemModal,
    numberSelector,
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
    numberSelector,
  ],
  providers: []
})
export class AppModule {}
