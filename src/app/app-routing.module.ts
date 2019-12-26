import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren:
      './auth/auth.module#AuthModule',
  },
  {
    path: 'main',
    loadChildren:
      './tabs/tabs.module#TabsModule',
      canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren:
      './settings/settings.module#SettingsModule',
      canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadChildren:
      './shop/shop.module#ShopModule',
      canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
