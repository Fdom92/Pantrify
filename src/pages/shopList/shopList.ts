import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { LoadingService } from '../../providers/loading.provider';
import { ShopItemModal } from '../../modals/shop-item/shop-item';
import { FirebaseService } from '../../providers/firebase.provider';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'shoplist-page',
  templateUrl: 'shopList.html'
})
export class ShopListPage {

  generated = false;
  items: Array<any> = [];

  constructor(private _loading: LoadingService, private _modalCtrl: ModalController,
    private _translate: TranslateService, private _fbService: FirebaseService) { }

  isAllDone() {
    return this.items.every((element, index, array) => { return element.units > 0; });
  }
  
  addSingleItem() {
    this.generated = true;
    const shopModal = this._modalCtrl.create(ShopItemModal);
    shopModal.onDidDismiss(data => {
      if (data) {
        this.items.push({ $key: '', title: data.title,
          units: parseInt(data.units, 10), done: false, type: data.category });
      }
    });
    shopModal.present();
  }

  addItemsToList(fbRef, type, ...args) {
    fbRef
      .subscribe(items => {
        items.forEach(item => {
          if (item.isFolder) {
            Object.keys(item.products).forEach(key => {
              item.products[key].units === 0 && this.items.push({
                type,
                $key: key,
                title: item.products[key].title,
                units: 0,
                folder: item,
                done: false,
              });
            });
          } else {
            item.units === 0 && this.items.push({
              type,
              $key: item.$key,
              title: item.title,
              units: 0,
              done: false,
            });
          }
        });
      });
    if (args.length > 0) {
      this._loading.dismiss();
    }
  }

  generateList() {
    this._translate.get('ShopList').subscribe(value => {
      this._loading.present({ content: value.generatingLoading });
    });
    this.generated = true;
    this.addItemsToList(this._fbService.getFood(), 'food');
    this.addItemsToList(this._fbService.getDrinks(), 'drinks');
    this.addItemsToList(this._fbService.getHome(), 'home', true);
  }

  finished() {
    this._translate.get('ShopList').subscribe(value => {
      this._loading.present({ content: value.addLoading });
    });
    this.items.forEach((value) => {
      if (value.$key === '') {
        this._fbService.pushItem({ title: value.title, units: value.units }, value.type);
      } else {
        if (value.folder) {
          this._fbService.updateItemFolder(value, value.type, { units: value.units }, value.folder);
        } else {
          this._fbService.updateItem(value, value.type, { units: value.units });
        }
      }
    });
    this._loading.dismiss().then(() => this.items = []);
  }
}
