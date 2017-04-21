import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ViewController, NavParams } from 'ionic-angular';

import { QuantityValidator } from  '../../validators/quantity';

@Component({
  templateUrl: "shopItemModal.html",
})
export class ShopItemModal {
  itemName: string = '';
  itemQuantity: number;
  addItemForm: FormGroup;

  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.addItemForm = new FormGroup({
        quantity: new FormControl('', [
            Validators.required,
            QuantityValidator.isValid
        ]),
        name: new FormControl('', [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z ]*')
       ]),
        category: new FormControl('', [
            Validators.required
       ])
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if(this.addItemForm.valid){
        this.viewCtrl.dismiss({title: this.itemName, units: this.itemQuantity, category: this.addItemForm.value.category});
    }
  }
}
