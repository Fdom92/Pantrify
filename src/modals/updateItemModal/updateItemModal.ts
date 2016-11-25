import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: "updateItemModal.html",
})
export class UpdateItemModal {

  simpleColumns: any;
  counter: number;
  product: any;

 constructor(public viewCtrl: ViewController, params: NavParams) {
   this.product = params.get('product');
   this.counter = params.get('product').units;
   this.simpleColumns = [{
      name: 'col1',
      options: [
        { text: '0', value: '0' },
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '7', value: '7' },
        { text: '8', value: '8' },
        { text: '9', value: '9' },
        { text: '10', value: '10' }]
  }];
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

 accept() {
   this.viewCtrl.dismiss({ product: this.product, units: this.counter});
 }

}
