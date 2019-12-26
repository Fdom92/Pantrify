import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopupService } from './popup.service';
import { SingleItemModalComponent } from './components/single-item-modal/single-item-modal.component';
import { FolderItemModalComponent } from './components/folder-item-modal/folder-item-modal.component';
import { SingleItemComponent } from './components/single-item/single-item.component';
import { FolderItemComponent } from './components/folder-item/folder-item.component';
import { AddItemPopoverComponent } from './components/add-item-popover/add-item-popover.component';
import { PantryService } from './pantry.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SingleItemComponent,
    FolderItemComponent,
    AddItemPopoverComponent,
    SingleItemModalComponent,
    FolderItemModalComponent
  ],
  declarations: [
    SingleItemComponent,
    FolderItemComponent,
    AddItemPopoverComponent,
    SingleItemModalComponent,
    FolderItemModalComponent
  ],
  entryComponents: [
    SingleItemComponent,
    FolderItemComponent,
    AddItemPopoverComponent,
    SingleItemModalComponent,
    FolderItemModalComponent
  ],
  providers: [
    PopupService,
    PantryService
  ]
})
export class SharedModule {}
