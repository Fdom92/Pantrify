import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddItemPopoverComponent } from './components/add-item-popover/add-item-popover.component';
import { FolderItemModalComponent } from './components/folder-item-modal/folder-item-modal.component';
import { FolderItemComponent } from './components/folder-item/folder-item.component';
import { SingleItemModalComponent } from './components/single-item-modal/single-item-modal.component';
import { SingleItemComponent } from './components/single-item/single-item.component';

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
  ]
})
export class SharedModule {}
