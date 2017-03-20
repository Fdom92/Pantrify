import { Injectable } from '@angular/core';

import { MenuController, Platform, ToastController } from 'ionic-angular';

@Injectable()
export class HardwareBackButtonService {

    private _didBackAlready = false;
    private _deregisterFn = null;

    constructor(private _plt : Platform, private _menuCtrl : MenuController, private _toastCtrl : ToastController) {}

    registerAction(fn) {
        this._deregisterFn = this
            ._plt
            .registerBackButtonAction(() => {
                fn();
            });
    }

    deregisterAction() {
        this._deregisterFn && this._deregisterFn();
    }

    doubleBackToExit() {

        // If sidemenu is open we close it instead of show the toast
        if (this._menuCtrl && this._menuCtrl.isOpen()) {
            return this
                ._menuCtrl
                .close();
        }

        // No sidemenu open lets handle double back to exit
        if (!this._didBackAlready) {
            this._didBackAlready = true;
            this._presentToast("Press back button again to exit");
            setTimeout(() => this._didBackAlready = false, 2000);
            return;
        }
        this
            ._plt
            .exitApp();
    }

    private _presentToast(content : string) {
        let toast = this
            ._toastCtrl
            .create({message: content, position: 'bottom', duration: 2000});

        toast.present();
    }

}