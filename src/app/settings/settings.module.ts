import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsRootComponent } from './containers/settings-root/settings-root.component';

@NgModule({
  imports: [
    SettingsRoutingModule,
    SharedModule,
  ],
  declarations: [
    SettingsRootComponent,
  ],
  entryComponents: [],
  exports: [],
})
export class SettingsModule {}
