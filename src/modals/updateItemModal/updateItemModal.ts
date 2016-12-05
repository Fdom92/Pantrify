import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: "updateItemModal.html",
})
export class UpdateItemModal {

  counter: number;
  product: any;

 constructor(public viewCtrl: ViewController, params: NavParams) {
   this.product = params.get('product');
   this.counter = params.get('product').units;
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

 accept() {
   this.viewCtrl.dismiss({ product: this.product, units: this.counter});
 }

 onAdd() {
   this.counter++;
 }

 onRemove() {
   if (this.counter > 0) {
     this.counter--;
   }
 }
}
