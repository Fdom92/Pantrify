import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { Menu } from '../menu/menu';

@Component({
  templateUrl: 'home.html',
})
export class Home {

  constructor(public navCtrl: NavController) {

  }

  registerUserWithFacebook(){
    console.log('Facebook');
    this.navCtrl.setRoot(Menu);
  }

  registerUserWithGoogle() {
    console.log('Google');
    this.navCtrl.setRoot(Menu);
  }

  openSignUpPage(){
    console.log('Signup');
    this.navCtrl.setRoot(Signup);
  }

  openLoginPage(){
    console.log('Login');
    this.navCtrl.setRoot(Login);
  }

  openTermsOfService(){
    console.log('Terms of service');
  }
}
