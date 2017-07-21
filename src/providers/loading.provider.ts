import { Injectable } from '@angular/core';

import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingService {

  loading: Loading = null;

  constructor(private _loadingCtrl: LoadingController) {
  }

  present(loadingOpt) {
    this.loading = this._loadingCtrl.create(loadingOpt);
    return this.loading.present();
  }

  dismiss() {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        return this.loading.dismiss(resolve(true)).catch(error => {
          console.log('loading error: ', error);
        });
      } else {
        resolve(true);
      }
    });
  }
}
