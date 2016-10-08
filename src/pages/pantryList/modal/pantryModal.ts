import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  template:`
  <ion-header>
  <ion-navbar>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">Close</button>
    </ion-buttons>
    <ion-title>Modals</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <button ion-button color="default" full (click)="dismiss()">Accept</button>
  <button ion-button clear full (click)="dismiss()">Cancel</button>
</ion-content>`
})
export class PantryModal {

 constructor(public viewCtrl: ViewController, params: NavParams) {
   console.log('product', params.get('product'));
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }
}
