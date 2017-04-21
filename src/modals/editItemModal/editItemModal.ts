import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: "editItemModal.html",
})
export class EditItemModal {

  itemName: string;
  itemQuantity: number;
  newName: string;
  newQuantity: number;

  constructor(public viewCtrl: ViewController, params: NavParams) {
    let item =  params.get('item');
    this.itemName = item.title;
    this.itemQuantity = item.units;
  }

  edit() {
    let data = {
      title: this.newName || this.itemName,
      units: this.newQuantity || this.itemQuantity,
      type: 'edit'
    };
    this.viewCtrl.dismiss(data);    
  }

  remove() {
    this.viewCtrl.dismiss({type: 'remove'});    
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
