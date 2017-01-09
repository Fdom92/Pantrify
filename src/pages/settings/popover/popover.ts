import { Component} from "@angular/core"; 

import { NavController } from 'ionic-angular';

import { HomePage } from './../../home/home';

import { AngularFire } from 'angularfire2';
 
@Component({ 
    templateUrl: "popover.html" 
}) 
export class SettingsPopOver { 
 
  constructor(public navCtrl: NavController, public af: AngularFire) { 
  } 
 
  logout() {
    this.af.auth.logout();
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }
} 