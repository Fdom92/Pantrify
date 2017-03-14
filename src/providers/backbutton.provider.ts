import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';

import {Platform, Events, ToastController, MenuController} from 'ionic-angular';

@Injectable()
export class HardwareBackButtonService {

    private _didBackAlready = false;
    private _deregisterFn = null;

    constructor(private _platform : Platform, private _events : Events, private _menuCtrl : MenuController, private _toastCtrl : ToastController, private _af : AngularFireAuth) {}

    registerAction(fn, p) {
        this._deregisterFn = this._platform.registerBackButtonAction(() => {
                fn();
        });
    }

    deregisterAction() {
        this._deregisterFn && this._deregisterFn();
    }

    doubleBackToExit() {

        if (!this._didBackAlready) {
            this._didBackAlready = true;
            this._presentToast("Press back button again to exit");
            setTimeout(() => this._didBackAlready = false, 2000);
            return;
        }
        this._platform.exitApp();
    }

    private _presentToast(content : string) {
        let toast = this
            ._toastCtrl
            .create({message: content, position: 'bottom', duration: 2000});

        toast.present();
    }
}