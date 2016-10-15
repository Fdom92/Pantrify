import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { pantryList } from '../pantryList/pantryList';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';

@Component({
  templateUrl: 'home.html',
})
export class Home {

  constructor(public navCtrl: NavController) {

  }

  registerUserWithFacebook(){
    console.log('Facebook');
    this.navCtrl.setRoot(pantryList);
  }

  registerUserWithGoogle() {
    console.log('Google');
    this.navCtrl.setRoot(pantryList);
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
