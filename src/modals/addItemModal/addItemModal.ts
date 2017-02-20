import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ViewController } from 'ionic-angular';

import { QuantityValidator } from  '../../validators/quantity';

@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {
  itemName: string = '';
  itemQuantity: number;
  addItemForm: FormGroup;

  constructor(public viewCtrl: ViewController) {
    this.addItemForm = new FormGroup({
        quantity: new FormControl('', [
            Validators.required,
            QuantityValidator.isValid
        ]),
        name: new FormControl('', [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z ]*')
       ])
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if(this.addItemForm.valid){
        let item = {title: this.itemName, units: this.itemQuantity};
        this.viewCtrl.dismiss(item);
    }
  }
}
