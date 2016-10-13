import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Item } from '../../items';

@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {
  itemName: string;
  itemQuantity: number;

 constructor(public viewCtrl: ViewController) {
   this.itemName = "";
   this.itemQuantity = null;
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

 accept() {
   let item = new Item(this.itemName, this.itemQuantity);
   this.viewCtrl.dismiss(item);
 }
}
