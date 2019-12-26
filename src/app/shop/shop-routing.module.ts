import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopRootComponent } from './containers/shop-root/shop-root.component';

const routes: Routes = [
  {
    path: '',
    component: ShopRootComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
