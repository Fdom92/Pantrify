import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Item } from '../../pages/pantryList/items';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { QuantityValidator } from  '../../validators/quantity';

@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {
  itemName: string;
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
            Validators.maxLength(10),
            Validators.pattern('[a-zA-Z ]*')
       ])
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if(this.addItemForm.valid){
        let item = new Item(this.itemName, this.itemQuantity);
        this.viewCtrl.dismiss(item);
    }
  }
}
