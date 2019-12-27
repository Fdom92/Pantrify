import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopupService } from '../../services/popup.service';


@Component({
  selector: 'app-folder-item-modal',
  templateUrl: './folder-item-modal.component.html',
  styleUrls: ['./folder-item-modal.component.scss'],
})
export class FolderItemModalComponent {
  folderForm: FormGroup;
  item: any;

  constructor(private params: NavParams, private popSvc: PopupService, private translateSvc: TranslateService) {
    this.folderForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[A-Z][a-zA-Z]*')])
    });
  }

  accept() {
    if (this.folderForm.valid) {
      const folderData = {
        title: this.folderForm.get('name').value ? this.folderForm.get('name').value : this.item.title,
      };
      this.popSvc.closeModal({type: this.params.data.type, item: folderData});
    } else {
      this.translateSvc.get('Error').subscribe(translation => {
        this.popSvc.simpleToast(translation.notValid, 'bottom', 3000);
      });
    }  }

  remove() {
    this.popSvc.closeModal({type: 'remove', item: null});
  }

  dismiss() {
    this.popSvc.closeModal({type: 'dismiss', item: null});
  }
}
