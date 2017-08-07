import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewController, NavParams, ToastController } from 'ionic-angular';

import { QuantityValidator } from '../../validators/quantity';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'shop-item.html',
})
export class ShopItemModal {
  shopItemForm: FormGroup;

  constructor(public viewCtrl: ViewController,
    public params: NavParams,
    private toastCtrl: ToastController,
    public translate: TranslateService) {

    this.shopItemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20),
        Validators.pattern('[^0-9]*')]),
      quantity: new FormControl('', [Validators.required, QuantityValidator.isValid]),
      category: new FormControl('', [Validators.required])
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if (this.shopItemForm.valid) {
      this.viewCtrl.dismiss({
        title: this.shopItemForm.get('name').value,
        units: this.shopItemForm.get('quantity').value,
        category: this.shopItemForm.get('category').value
      });
    } else {
      this.presentToast();
    }
  }

  presentToast() {
    this.translate.get('Error').subscribe(value => {
      const toast = this.toastCtrl.create({
        message: value.notValid,
        duration: 1500,
        position: 'bottom'
      });

      toast.present();
    });
  }
}
