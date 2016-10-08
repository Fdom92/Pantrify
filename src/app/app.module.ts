import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { pantryList } from '../pages/pantryList/pantryList';
import { Snacks } from '../pages/pantryList/tabs/snacksTab';
import { Drinks } from '../pages/pantryList/tabs/drinksTab';
import { Frozen } from '../pages/pantryList/tabs/frozenTab';

@NgModule({
  declarations: [
    MyApp,
    pantryList,
    Snacks,
    Drinks,
    Frozen,
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
  ],
  providers: []
})
export class AppModule {}
