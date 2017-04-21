import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ViewController, NavParams, ToastController } from 'ionic-angular';

import { QuantityValidator } from  '../../validators/quantity';

import { TranslateService } from 'ng2-translate';

@Component({
  templateUrl: "addItemModal.html",
})
export class AddItemModal {
  itemName: string = '';
  itemQuantity: number;
  addItemForm: FormGroup;

  constructor(public viewCtrl: ViewController, 
              public params: NavParams,              
              private toastCtrl: ToastController, 
              public translate: TranslateService) {
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
        this.viewCtrl.dismiss({title: this.itemName, units: this.itemQuantity});
    } else {
      this.presentToast();
    }
  }

  presentToast() {
    this.translate.get('Error').subscribe( value => {
      let toast = this.toastCtrl.create({
          message: value.notValid,
          duration: 1500,
          position: 'bottom'
      });

      toast.present();
    });
  }
}
