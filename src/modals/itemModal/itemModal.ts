import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { QuantityValidator } from  '../../validators/quantity';

import { ViewController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: "itemModal.html",
})
export class ItemModal {
  itemForm: FormGroup;
  type: string;
  item: any;

  constructor(public viewCtrl: ViewController, public params: NavParams, private toastCtrl: ToastController, 
              public translate: TranslateService) {
    
    this.itemForm = new FormGroup({
        'name': new FormControl('', [Validators.required, 
                                     Validators.maxLength(20), 
                                     Validators.pattern('[A-Z][a-zA-Z]*')]),      
        'quantity': new FormControl('', [Validators.required, QuantityValidator.isValid])
    });

    this.type = params.get('type');

    if (this.type === 'edit') {
      this.item = params.get('item');
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if (this.itemForm.valid) {
        let itemData = {
          type: this.type,
          title: this.itemForm.get('name').value ? this.itemForm.get('name').value : this.item.title,
          units: this.itemForm.get('quantity').value ? this.itemForm.get('quantity').value : this.item.units
        };
        this.viewCtrl.dismiss(itemData);
    } else {
      this.presentToast();
    }
  }

  remove() {
    this.viewCtrl.dismiss({type: 'remove'});    
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
