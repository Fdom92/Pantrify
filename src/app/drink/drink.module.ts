import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DrinkRoutingModule } from './drink-routing.module';
import { DrinkComponent } from './containers/drink/drink.component';

@NgModule({
  imports: [
    DrinkRoutingModule,
    SharedModule
  ],
  declarations: [
    DrinkComponent
  ],
  entryComponents: [],
  exports: [],
})
export class DrinkModule { }
