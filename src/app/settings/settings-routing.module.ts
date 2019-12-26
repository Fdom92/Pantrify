import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsRootComponent } from './containers/settings-root/settings-root.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsRootComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
