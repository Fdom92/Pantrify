import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { Menu } from '../menu/menu';

@Component({
  templateUrl: 'home.html',
})
export class Home {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  registerUserWithFacebook(){
    this.navCtrl.setRoot(Menu);
  }

  registerUserWithGoogle() {
    this.navCtrl.setRoot(Menu);
  }

  openSignUpPage(){
    this.navCtrl.setRoot(Signup);
  }

  openLoginPage(){
    this.navCtrl.setRoot(Login);
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
