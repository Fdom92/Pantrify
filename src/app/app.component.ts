import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Home } from '../pages/home/home';
import { Menu } from '../pages/menu/menu';

import {FirebaseConfig} from '../../config/firebase.config';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    firebase.initializeApp(FirebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = Home;
      } else {
        this.rootPage = Menu;
      }
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
