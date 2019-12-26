import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrinkComponent } from './containers/drink/drink.component';

const routes: Routes = [
  {
      path: '',
      component: DrinkComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrinkRoutingModule {}
