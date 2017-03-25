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

    ionViewDidEnter() {
        this._backBtn.registerAction(() => {
          this._backBtn.doubleBackToExit();
        });
    }

    ionViewWillLeave() {
        this._backBtn.deregisterAction();
    }

    logout(){
        this.alertProvider.createWithCallback("Are you sure?",
            "This will log you out of this application.", true).then((yes) => {
            if (yes) {
                this.af.auth.logout().then( () => {
                    this.navCtrl.setRoot(HomePage);
                }, (error) => {
                    console.log('auth logout error', error);
                });
            }
        });
    }
}
