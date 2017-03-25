import { Component }                          from "@angular/core";
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { NavController, MenuController, ToastController } from 'ionic-angular';

import { UserData }       from '../../providers/user.provider';
import { LoadingService } from '../../providers/loading.provider';

import { AngularFire }      from 'angularfire2';
import { TranslateService } from 'ng2-translate';

@Component({
    templateUrl: "signup.html"
})
export class SignupPage {

    email: string;
    password: string;
    registerForm: FormGroup;

    constructor(public userdata: UserData, 
                public navCtrl: NavController, 
                public menu: MenuController, 
                public af: AngularFire, 
                private toastCtrl: ToastController, 
                private _loading: LoadingService, 
                public translate: TranslateService) {
                    
        this.registerForm = new FormGroup({
            email: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    registerUser() {
        this.translate.get('Home').subscribe( value => {
            this._loading.present({content: value.signupLoading});
        });        
        this.af.auth.createUser({ email: this.email, password: this.password })
        .then((response: any) => {
             this._loading.dismiss();
        })
        .catch((error: any) => {
            this._loading.dismiss(); 
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
