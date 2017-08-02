import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { QuantityValidator } from '../../validators/quantity';

import { ViewController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'item.html',
})
export class ItemModal {
  itemForm: FormGroup;
  type: string;
  item: any;
  folders: any;

  constructor(private viewCtrl: ViewController, private params: NavParams,
    private toastCtrl: ToastController, private translate: TranslateService) {

    this.type = this.params.get('type');
    this.folders = this.params.get('folders');

    if (this.type === 'edit') {
      this.itemForm = new FormGroup({
        name: new FormControl('', [Validators.maxLength(20), Validators.pattern('[^0-9]*')]),
        quantity: new FormControl('', [QuantityValidator.isValid]),
        moveFolder: new FormControl('', [])
      });
      this.item = this.params.get('item');
    } else {
      this.itemForm = new FormGroup({
        name: new FormControl('', [Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[^0-9]*')]),
        quantity: new FormControl('', [Validators.required, QuantityValidator.isValid]),
        moveFolder: new FormControl('', [])
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  accept() {
    if (this.type === 'edit') {
      const itemData = {
        type: this.type,
        title: this.itemForm.get('name').value ? this.itemForm.get('name').value : this.item.title,
        units: this.itemForm.get('quantity').value ? this.itemForm.get('quantity').value : this.item.units,
        moveFolder: this.itemForm.get('moveFolder').value ? this.itemForm.get('moveFolder').value : ''
      };
      this.viewCtrl.dismiss(itemData);
    } else {
      if (this.itemForm.valid) {
        const itemData = {
          type: this.type,
          title: this.itemForm.get('name').value,
          units: this.itemForm.get('quantity').value,
          moveFolder: this.itemForm.get('moveFolder').value ? this.itemForm.get('moveFolder').value : ''
        };
        this.viewCtrl.dismiss(itemData);
      } else {
        this.presentToast();
      }
    }
  }

  remove() {
    this.viewCtrl.dismiss({ type: 'remove' });
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
