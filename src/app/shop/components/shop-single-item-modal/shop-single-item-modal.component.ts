import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopupService } from '../../../shared/services/popup.service';

@Component({
  selector: 'app-shop-single-item-modal',
  templateUrl: './shop-single-item-modal.component.html',
  styleUrls: ['./shop-single-item-modal.component.scss'],
})
export class ShopSingleItemModalComponent {

  shopItemForm: FormGroup;

  constructor(private params: NavParams, private popSvc: PopupService, private translateSvc: TranslateService) {
    this.shopItemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20),
      Validators.pattern('[^0-9]*')]),
      quantity: new FormControl('', [Validators.required]),
      minimum: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

  accept() {
    if (this.shopItemForm.valid) {
      const itemData = {
        title: this.shopItemForm.get('name').value,
        units: this.shopItemForm.get('quantity').value,
        category: this.shopItemForm.get('category').value,
        minimum: this.shopItemForm.get('minimum').value
      };
      this.popSvc.closeModal({ type: 'add', item: itemData });
    } else {
      this.translateSvc.get('Error').subscribe(translation => {
        this.popSvc.simpleToast(translation.notValid, 'bottom', 3000);
      });
    }
  }

  dismiss() {
    this.popSvc.closeModal({ type: 'dismiss', item: null });
  }
}
