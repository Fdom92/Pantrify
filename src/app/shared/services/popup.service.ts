import { Injectable } from '@angular/core';
import {
  ModalController,
  PopoverController,
  ToastController,
  AlertController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

    /**
   * Shows up a simple toas with one button
   * @param message The message for the toas
   * @param position The position for the toas
   * @param duration The duration for the toas
   */
  async simpleToast(message: string, position, duration: number) {
    const alert = await this.toastCtrl.create({
      message,
      position,
      duration
    });
    await alert.present();
  }

  /**
   * Shows up a modal page
   * @param modalOptions The options object to create the modal
   */
  async openModal(modalOptions) {
    const modal = await this.modalCtrl.create(modalOptions);
    await modal.present();
    return modal.onDidDismiss();
  }

  /**
   * Dismiss the modal page
   */
  async closeModal(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  /**
   * Return the top modal
   */
  async topModal() {
    return this.modalCtrl.getTop();
  }

  /**
   * Shows up a popover
   * @param popoverOptions The options object to create the popover
   */
  async openPopover(popoverOptions) {
    const popover = await this.popoverCtrl.create(popoverOptions);
    await popover.present();
    return popover.onDidDismiss();
  }

  /**
   * Dismiss the modal page
   */
  async closePopover(data?: any) {
    this.popoverCtrl.dismiss(data);
  }

  /**
   * This method will open an alert with a title and message and yes/no buttons
   * @param header A string to show in the title of the alert
   * @param message A string to show in the body of the alert
   */
  async openAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{
        text: 'Ok',
      }]
    });
    await alert.present();
  }
}
