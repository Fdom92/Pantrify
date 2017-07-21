import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close('item')">{{ 'Pantry.popover.item' | translate }}</button>
      <button ion-item (click)="close('folder')">{{ 'Pantry.popover.folder' | translate }}</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close(type) {
    this.viewCtrl.dismiss(type);
  }
}
