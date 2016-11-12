import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { Menu } from '../menu/menu';

import firebase from 'firebase';

@Component({
  templateUrl: 'home.html',
})
export class Home {

  googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(public navCtrl: NavController) {

  }

  registerUserWithFacebook(){
    console.log('Facebook');
    this.navCtrl.setRoot(Menu);
  }

  registerUserWithGoogle() {
    console.log('Google');
    firebase.auth().signInWithPopup(this.googleProvider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log('token', result.credential.accessToken);
      // The signed-in user info.
      console.log('user', result.user);
    }).catch(function(error) {
      console.log('KO', error);
    });
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
