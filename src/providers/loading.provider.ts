import { Injectable } from '@angular/core';

import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingService {

    loading: Loading = null;

    constructor(private _loadingCtrl: LoadingController) {
    }

    present(loadingOpt) {
        this.loading = this._loadingCtrl.create(loadingOpt);
        this.loading.present();
    }

    dismiss() {
        this.loading.dismiss();
    }
}