import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';


@Component({
  templateUrl: "removeItemModal.html",
})
export class RemoveItemModal {

  counter: number;
  max: number;
  product: any;


 constructor(public viewCtrl: ViewController, params: NavParams) {
   this.product = params.get('product');
   this.max = params.get('product').units;
   this.counter = 1;
 }

 onAdd() {
   if (this.counter < this.max) {
       this.counter++;
   }
 }

 onMinus() {
   if (this.counter > 1) {
       this.counter--;
   }
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

 accept() {
   this.viewCtrl.dismiss({'product': this.product, 'units': this.counter});
 }
}
