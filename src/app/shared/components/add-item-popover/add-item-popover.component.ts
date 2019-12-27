import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-add-item-popover',
  templateUrl: './add-item-popover.component.html',
  styleUrls: ['./add-item-popover.component.scss'],
})
export class AddItemPopoverComponent {

  constructor(private popupSvc: PopupService) {}

  dismiss(type: string) {
    this.popupSvc.closePopover(type);
  }
}
