import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootPage } from './pages/root/root.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: RootPage,
    children: [
      {
        path: 'food',
        children: [{
          path: '',
          loadChildren: '../food/food.module#FoodModule'
        }]
      },
      {
        path: 'drink',
        children: [{
          path: '',
          loadChildren: '../drink/drink.module#DrinkModule'
        }]
      },
      {
        path: 'home',
        children: [{
          path: '',
          loadChildren: '../home/home.module#HomeModule'
        }]
      },
      {
        path: '',
        redirectTo: '/main/tabs/food',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/tabs/food',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule { }
