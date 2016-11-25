import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: "updateItemModal.html",
})
export class UpdateItemModal {

  counter: number;
  max: number;
  product: any;
  numbers: Array<number>;

 constructor(public viewCtrl: ViewController, params: NavParams) {
   this.product = params.get('product');
   this.max = params.get('product').units;
   this.counter = 1;
   this.numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
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

  selectNumber(number) {
    this.counter = number;
  }
}
