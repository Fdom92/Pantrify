import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShopRootComponent } from './containers/shop-root/shop-root.component';
import { ShopSingleItemComponent } from './components/shop-single-item/shop-single-item.component';
import { ShopSingleItemModalComponent } from './components/shop-single-item-modal/shop-single-item-modal.component';

@NgModule({
  imports: [
    ShopRoutingModule,
    SharedModule,
  ],
  declarations: [
    ShopRootComponent,
    ShopSingleItemComponent,
    ShopSingleItemModalComponent
  ],
  entryComponents: [
    ShopSingleItemComponent,
    ShopSingleItemModalComponent
  ],
  exports: [],
})
export class ShopModule {}
