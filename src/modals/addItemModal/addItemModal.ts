import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Item } from '../../pages/pantryList/items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuantityValidator } from  '../../validators/quantity';

@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {
  itemName: string;
  itemQuantity: number;
  addItemForm: FormGroup;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder) {
    this.addItemForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        quantity: ['', Validators.compose([Validators.required]), QuantityValidator.isValid]
        
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
