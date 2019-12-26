import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RootPage } from './pages/root/root.page';
import { TabsRoutingModule } from './tabs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsRoutingModule
  ],
  declarations: [
    RootPage
  ],
  entryComponents: [],
  providers: []
})
export class TabsModule { }
