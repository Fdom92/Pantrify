import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

import { LoginPage }  from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {}

  openSignUpPage(){
    this.navCtrl.push(SignupPage, {}, {animate: false});
  }

  openLoginPage(){
    this.navCtrl.push(LoginPage, {}, {animate: false});
  }

  openTermsOfService(){
    console.log('Terms of service');
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
