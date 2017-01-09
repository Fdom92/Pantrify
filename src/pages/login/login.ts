import {Component} from "@angular/core";

import { NavController, MenuController, ToastController } from 'ionic-angular';

import { Menu } from '../menu/menu';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    templateUrl: "login.html"
})
export class LoginPage {

    email: string;
    password: string;

    constructor(public navCtrl: NavController, public menu: MenuController, public af: AngularFire, private toastCtrl: ToastController) {
    }

    onLogin() {
        this.af.auth.login({ email: 'fer.olmo92@gmail.com', password: 'fersanse' },
        { provider: AuthProviders.Password, method: AuthMethods.Password })
        .then((response: any) => {
            console.log('RESPONSE', response);
            this.navCtrl.setRoot(Menu);
        })
        .catch((error: any) => { 
            console.log('ERROR', error); 
            this.presentToast(error.message);
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

    presentToast(errMessage) {
    let toast = this.toastCtrl.create({
        message: errMessage,
        duration: 3000,
        position: 'bottom'
    });

    toast.present();
    }
}
