import {Component} from "@angular/core";
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { NavController, MenuController, ToastController } from 'ionic-angular';

import { Menu } from '../menu/menu';
import { UserData } from '../../providers/user.provider';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    templateUrl: "login.html"
})
export class LoginPage {

    email: string;
    password: string;
    loginForm: FormGroup;

    constructor(public userdata: UserData, public navCtrl: NavController, public menu: MenuController, public af: AngularFire, private toastCtrl: ToastController) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    onLogin() {
        this.af.auth.login({ email: this.email, password: this.password },
        { provider: AuthProviders.Password, method: AuthMethods.Password })
        .then((response: any) => {
            this.navCtrl.pop({animate: false});
            this.userdata.setUserData(response.auth);
            this.navCtrl.setRoot(Menu);
        })
        .catch((error: any) => { 
            this.presentToast(error.message);
        });
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

    goBack() {
        this.navCtrl.pop({animate: false});
    }
}
