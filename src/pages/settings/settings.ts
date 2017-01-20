import { Component } from '@angular/core';

import { AlertController, PopoverController } from 'ionic-angular';

import { SettingsPopOver } from './popover/popover';

import { TranslateService } from 'ng2-translate';

@Component({
    templateUrl: "settings.html"
})
export class SettingsPage {
    language: string;

    constructor(public translate: TranslateService, private alertCtrl: AlertController, public popoverCtrl: PopoverController) {
        this.language = translate.currentLang;
    }

    onChange(e) {
        this.translate.use(e);
    }

    presentAlert() {
    let alert = this.alertCtrl.create({
        title: 'Thank you',
        subTitle: 'Contact us at fer.olmo92@gmail.com ',
        buttons: ['Dismiss']
    });
    alert.present();
    }

    presentPopover(ev) { 
      let popover = this.popoverCtrl.create(SettingsPopOver, {}); 
 
      popover.present({ 
        ev: ev 
      }); 
    }
}
