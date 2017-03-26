import { HomePage } from '../home/home';
import { AlertService } from '../../providers/alert.provider';
import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user.provider';
import { HardwareBackButtonService } from '../../providers/backbutton.provider';

import { TranslateService } from 'ng2-translate';
import { AngularFire } from 'angularfire2';

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
                private alertProvider: AlertService,
                public af: AngularFire,
                public navCtrl: NavController) {

        this.language = translate.currentLang;
        this.usermail = this.userdata.getEmail();
    }

    onChange(e) {
        this.translate.use(e);
    }

    ionViewDidEnter() {
        this._backBtn.registerAction(() => {
          this._backBtn.doubleBackToExit();
        });
    }

    ionViewWillLeave() {
        this._backBtn.deregisterAction();
    }

    logout(){
        this.translate.get('Settings.other.dialog').subscribe( value => {
            this.alertProvider.createWithCallback(value.title,
                value.text, true).then((yes) => {
                if (yes) {
                    this.af.auth.logout().then( () => {
                        this.navCtrl.setRoot(HomePage);
                    }, (error) => {
                        console.log('auth logout error', error);
                    });
                }
            });
        });
    }
}
