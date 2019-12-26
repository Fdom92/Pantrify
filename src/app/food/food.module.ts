import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './containers/food/food.component';

@NgModule({
  imports: [
    FoodRoutingModule,
    SharedModule
  ],
  declarations: [
    FoodComponent
  ],
  entryComponents: [],
  exports: [],
})
export class FoodModule { }
