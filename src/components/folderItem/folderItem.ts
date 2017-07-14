import { Component, Input, OnInit } from '@angular/core';
 import { ToastController } from 'ionic-angular';

import { UserData } from '../../providers/user.provider';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'folder-item',
  templateUrl: 'folderItem.html'
})
export class FolderItemComponent implements OnInit{
 
    @Input('products') products;
    @Input('type') type;
    @Input('folder') folder;

    items: Array<any> = [];

    constructor(private _af: AngularFireDatabase, private userdata: UserData,
                private toastCtrl: ToastController, private translate: TranslateService) {
    }

    ngOnInit() {
        Object.keys(this.products).forEach(key => {
            this.items.push({
                $key: key,
                title: this.products[key].title,
                units: this.products[key].units
            });
        });
    }
 
    onAdd(item, key) {
        let data = { title:item.title, units:parseInt(item.units) + 1 };
        if (data.units <= 999) {
            this._af.list('/' + this.userdata.getUid() + '/' + this.type
                + '/' + this.folder.$key + '/products/').update(key, data);
        } else {
            this.presentToast();
        }
    }

    onRemove(item, key) {
        let data = { title:item.title, units:parseInt(item.units) - 1 };
        if (data.units >= 0) {
            this._af.list('/' + this.userdata.getUid() + '/' + this.type
                + '/' + this.folder.$key + '/products/').update(key, data);
        }
    }

    presentToast() {
        this.translate.get('Error').subscribe( value => {
            let toast = this.toastCtrl.create({
                message: value.addItemMax,
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
        });
    }
}