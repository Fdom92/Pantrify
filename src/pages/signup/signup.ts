import {Component} from "@angular/core";

import { NavController, MenuController } from 'ionic-angular';

import { Menu } from '../menu/menu';

import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: "signup.html"
})
export class SignupPage {

    email: string;
    password: string;

    constructor(public navCtrl: NavController, public menu: MenuController, public af: AngularFire) {
    }

    registerUser() {
        this.af.auth.createUser({ email: 'fer.olmo92@gmail.com', password: 'fersanse' })
        .then((response: any) => {
             console.log('RESPONSE', response);
             this.navCtrl.setRoot(Menu);
        });
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
