import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { Menu } from '../menu/menu';
import { AuthData } from '../../providers/auth';

import firebase from 'firebase';

@Component({
  templateUrl: 'home.html',
})
export class Home {

  googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(public navCtrl: NavController, public authData: AuthData) {

  }

  registerUserWithFacebook(){
    console.log('Facebook');
    this.navCtrl.setRoot(Menu);
  }

  registerUserWithGoogle() {
    console.log('Google');
    this.authData.googleSignin();
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
