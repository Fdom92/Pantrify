import { Injectable } from '@angular/core';
 import { ToastController } from 'ionic-angular';

import { UserData } from './user.provider';

import { AngularFireDatabase } from 'angularfire2/database';
import { TranslateService } from '@ngx-translate/core';

const fbQuery = {
    orderByChild: 'title',
    limitToLast: 15
};

@Injectable()
export class FirebaseService {

    folders: Array<any> = [];

    constructor(private _af: AngularFireDatabase, private _userData: UserData,
                private _translate: TranslateService, private _toastCtrl: ToastController) {
      this._af.list('/' + this._userData.getUid() + '/food').subscribe(data => {
         this.folders[0] = data.filter(ele => ele.isFolder === true)
      });
      this._af.list('/' + this._userData.getUid() + '/drinks').subscribe(data => {
         this.folders[1] = data.filter(ele => ele.isFolder === true)
      });
      this._af.list('/' + this._userData.getUid() + '/home').subscribe(data => {
         this.folders[2] = data.filter(ele => ele.isFolder === true)
      });
    }

    getFolders() {
        return this.folders;
    }

    getFood() {
        return this._af.list('/' + this._userData.getUid() + '/food', {query: fbQuery})
    }

    getDrinks() {
        return this._af.list('/' + this._userData.getUid() + '/drinks', {query: fbQuery})
    }

    getHome() {
        return this._af.list('/' + this._userData.getUid() + '/home', {query: fbQuery})
    }

    updateItem(item, type, data) {
        if (data.units >= 0 && data.units <= 999) {
            this._af.list('/' + this._userData.getUid() + '/' + type).update(item.$key, data);
        } else {
            this.presentToast();
        }
    }

    updateItemFolder(item, type, data, folder) {
        if (data.units >= 0 && data.units <= 999) {
            this._af.list('/' + this._userData.getUid() + '/' + type + '/' + folder.$key + '/products/')
                .update(item.$key, data);
        } else {
            this.presentToast();
        }
    }

    updateFolder(item, type, data) {
        this._af.list('/' + this._userData.getUid() + '/' + type).update(item.$key, data);
    }

    removeItem(item, type) {
        this._af.list('/' + this._userData.getUid() + '/' + type).remove(item.$key);
    }

    removeItemFolder(item, type, folder) {
        this._af.list('/' + this._userData.getUid() + '/' + type + '/' + folder.$key + '/products/')
            .remove(item.$key);
    }

    pushItem(item, type) {
        this._af.list('/' + this._userData.getUid() + '/' + type).push(item);
    }

    pushItemFolder(item, type, folder) {
        this._af.list('/' + this._userData.getUid() + '/' + type + '/' + folder.$key + '/products/').push(item);
    }

    presentToast() {
        this._translate.get('Error').subscribe( value => {
            let toast = this._toastCtrl.create({
                message: value.addItemMax,
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
        });
    }
}