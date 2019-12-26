import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopupService } from '../../../shared/popup.service';


@Component({
  selector: 'app-single-item-modal',
  templateUrl: './single-item-modal.component.html',
  styleUrls: ['./single-item-modal.component.scss'],
})
export class SingleItemModalComponent {

  itemForm: FormGroup;

  constructor(private params: NavParams, private popSvc: PopupService, private translateSvc: TranslateService) {
    if (this.params.data.type === 'edit') {
      this.itemForm = new FormGroup({
        name: new FormControl('', [Validators.maxLength(20), Validators.pattern('[^0-9]*')]),
        quantity: new FormControl(''),
        minimum: new FormControl(''),
        moveFolder: new FormControl('')
      });
    } else {
      this.itemForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[^0-9]*')]),
        quantity: new FormControl('', [Validators.required]),
        minimum: new FormControl('', [Validators.required]),
        moveFolder: new FormControl('')
      });
    }
  }

  accept() {
    if (this.params.data.type === 'edit') {
      const itemData = {
        type: this.params.data.type,
        title: this.itemForm.get('name').value ? this.itemForm.get('name').value : this.params.data.item.title,
        units: this.itemForm.get('quantity').value ? this.itemForm.get('quantity').value : this.params.data.item.units,
        minimum: this.itemForm.get('minimum').value ? this.itemForm.get('minimum').value : this.params.data.item.minimum
      };
      const moveToFolder = this.itemForm.get('moveFolder').value ? this.itemForm.get('moveFolder').value : null;
      this.popSvc.closeModal({type: 'edit', item: itemData, moveToFolder});
    } else {
      if (this.itemForm.valid) {
        const itemData = {
          type: this.params.data.type,
          title: this.itemForm.get('name').value,
          units: this.itemForm.get('quantity').value,
          minimum: this.itemForm.get('minimum').value
        };
        const moveToFolder = this.itemForm.get('moveFolder').value ? this.itemForm.get('moveFolder').value : null;
        this.popSvc.closeModal({type: 'add', item: itemData, moveToFolder});
      } else {
        this.translateSvc.get('Error').subscribe(translation => {
          this.popSvc.simpleToast(translation.notValid, 'bottom', 3000);
        });
      }
    }
  }

  remove() {
    this.popSvc.closeModal({type: 'remove', item: null, moveToFolder: null});
  }

  dismiss() {
    this.popSvc.closeModal({type: 'dismiss', item: null, moveToFolder: null});
  }
}
