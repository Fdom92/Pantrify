import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { LoadingService } from '../../providers/loading.provider';
import { UserData } from '../../providers/user.provider';
import { ShopItemModal } from '../../modals/shopItemModal/shopItemModal';
import { FirebaseService } from '../../providers/firebase.provider';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'shopList.html'
})
export class ShopListPage {

  items: Array<any> = [];

  constructor(private _loading: LoadingService,
              private userdata: UserData,
              public modalCtrl: ModalController,
              public translate: TranslateService,
              private _fbService: FirebaseService) {
  }

  isAllDone() {
    return this.items.every((element, index, array) => {return element.done});
  }

  addSingleItem() {
      let shopModal = this.modalCtrl.create(ShopItemModal);
      shopModal.onDidDismiss(data => {
        if (data) {
          this.items.push({$key: '', title: data.title, units: data.units, done: false, type: data.category});
        }
      });
      shopModal.present();
  }

  onAdd(item) {
    if (item.units < 999) {
      item.units += 1;
    }
  }

  onRemove(item) {
    if (item.units > 1) {
      item.units -= 1;
    }
  }

  addItemsToList(fbRef, type, ...args) {
    fbRef
      .subscribe(items => {
        items.forEach(item => {
          if (item.isFolder) {
            Object.keys(item.products).forEach(key => {
              this.items.push({
                $key: key,
                title: item.products[key].title,
                units: 1,
                folder: item,
                done: false, 
                type: type
              })
            });
          } else {
            item.units === 0 && this.items.push({$key: item.key, title: item.title, units: 1, 
                                                 done: false, type: type});
          }
        });
    });
    if (args.length > 0) {
      this._loading.dismiss();
    }
  }

  generateList() {
    this.translate.get('ShopList').subscribe( value => {
        this._loading.present({content: value.generatingLoading});
    });
    this.addItemsToList(this._fbService.getFood(), 'food');
    this.addItemsToList(this._fbService.getDrinks(), 'drinks');
    this.addItemsToList(this._fbService.getHome(), 'home', true);
  }

  updateItemsOnPantry(fbRef, type, ...args) {
    this.items.filter((value) => value.type === type).forEach((value) => {
      if (value.$key === '') {
        fbRef.push({title: value.title, units: value.units});
      } else {
        if (value.folder) {
          this._fbService.updateItemFolder(value, type, {units: value.units}, value.folder);
        } else {
          fbRef.update(value.$key, { units: value.units });         
        }
      }
    });
    if (args.length > 0) {
      this._loading.dismiss().then(() => this.items = []);
    }
  }

  finished() {
    this.translate.get('ShopList').subscribe( value => {
        this._loading.present({content: value.addLoading});
    });
    this.updateItemsOnPantry(this._fbService.getFood(), 'food');    
    this.updateItemsOnPantry(this._fbService.getDrinks(), 'drinks');
    this.updateItemsOnPantry(this._fbService.getHome(), 'home', true);
  }
}
