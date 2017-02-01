import { Component } from '@angular/core';

import { AlertController, PopoverController } from 'ionic-angular';

import { UserData } from '../../providers/user.provider';
import { SettingsPopOver } from './popover/popover';

import { TranslateService } from 'ng2-translate';

@Component({
    templateUrl: "settings.html"
})
export class SettingsPage {
    language: String;
    usermail: String;

    constructor(public userdata: UserData, public translate: TranslateService, private alertCtrl: AlertController, public popoverCtrl: PopoverController) {
        this.language = translate.currentLang;
        this.usermail = this.userdata.getEmail();
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
