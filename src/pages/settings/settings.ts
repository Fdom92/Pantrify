import { Component } from '@angular/core';

import { AlertController, PopoverController } from 'ionic-angular';

import { SettingsPopOver }           from './popover/popover';
import { UserData }                  from '../../providers/user.provider';
import { HardwareBackButtonService } from '../../providers/backbutton.provider';

import { TranslateService } from 'ng2-translate';

@Component({
    templateUrl: "settings.html"
})
export class SettingsPage {
    language: String;
    usermail: String;

    constructor(private _backBtn: HardwareBackButtonService, 
                public userdata: UserData, 
                public translate: TranslateService, 
                private alertCtrl: AlertController, 
                public popoverCtrl: PopoverController) {

        this.language = translate.currentLang;
        this.usermail = this.userdata.getEmail();
    }

    onChange(e) {
        this.translate.use(e);
    }

    presentAlert() {
        this.translate.get('Settings.support.dialog').subscribe( value => {
            let alert = this.alertCtrl.create({
                title: value.title,
                subTitle: value.text + ' fer.olmo92@gmail.com',
                buttons: [value.button]
            });
            alert.present();
        });
    }

    presentPopover(ev) { 
      let popover = this.popoverCtrl.create(SettingsPopOver, {}); 
 
      popover.present({ 
        ev: ev 
      }); 
    }

    ionViewDidEnter() {
        this._backBtn.registerAction(() => {
          this._backBtn.doubleBackToExit();
        });
    }

    ionViewWillLeave() {
        this._backBtn.deregisterAction();
    }
}
