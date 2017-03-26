import { Component } from "@angular/core";
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { App, MenuController, NavController, ToastController } from 'ionic-angular';

import { PantryPage } from '../pantry/pantry';
import { UserData } from '../../providers/user.provider';
import { LoadingService } from '../../providers/loading.provider';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { TranslateService } from 'ng2-translate';

@Component({
    templateUrl: "login.html"
})
export class LoginPage {

    email: string;
    password: string;
    loginForm: FormGroup;

    constructor(public app: App,
                public userdata: UserData,
                public navCtrl: NavController,
                public menu: MenuController,
                public af: AngularFire,
                private toastCtrl: ToastController,
                private _loading: LoadingService,
                public translate: TranslateService) {

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
        this.translate.get('Home').subscribe( value => {
            this._loading.present({content: value.loginLoading});
        });
        this.af.auth.login({ email: this.email, password: this.password },
        { provider: AuthProviders.Password, method: AuthMethods.Password })
        .then((response: any) => {
            this._loading.dismiss().then(() => {
                this.userdata.setUserData(response.auth);
                this.navCtrl.setRoot(PantryPage);
            });
        })
        .catch((error: any) => {
            this._loading.dismiss().then(()=> {
                this.presentToast(error.message);
            });
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
