import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user.provider';
import { HardwareBackButtonService } from '../../providers/backbutton.provider';
import { HomePage } from '../home/home';
import { AlertService } from '../../providers/alert.provider';

import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  language: String;
  usermail: String;

  constructor(private _backBtn: HardwareBackButtonService,
    public userdata: UserData,
    public translate: TranslateService,
    private alertProvider: AlertService,
    public af: AngularFireAuth,
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

  logout() {
    this.translate.get('Settings.other.dialog').subscribe(value => {
      this.alertProvider.createWithCallback(value.title,
        value.text, true).then((yes) => {
          if (yes) {
            this.af.auth.signOut().then(() => {
              this.navCtrl.setRoot(HomePage);
            }, (error) => {
              console.log('auth logout error', error);
            });
          }
        });
    });
  }
}
