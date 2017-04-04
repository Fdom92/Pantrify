import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ViewController, NavParams } from 'ionic-angular';

import { QuantityValidator } from  '../../validators/quantity';

@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {
  itemName: string = '';
  itemQuantity: number;
  addItemForm: FormGroup;
  showType: boolean;

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

    this.showType = params.get('shop');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if(this.addItemForm.valid){
        let item = {title: this.itemName, units: this.itemQuantity, category: undefined};
        if (this.showType) {
          item.category = this.addItemForm.value.category;
        }
        this.viewCtrl.dismiss(item);
    }
  }
}
