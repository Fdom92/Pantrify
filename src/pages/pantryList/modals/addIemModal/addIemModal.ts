import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {

 constructor(public viewCtrl: ViewController) {
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }
}
