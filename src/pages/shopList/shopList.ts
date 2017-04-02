import { Component } from '@angular/core';

import { LoadingService } from '../../providers/loading.provider';

class ShopItem {
  name: String;
  quantity: Number;
  done: boolean;
}

@Component({
  templateUrl: 'shopList.html'
})
export class ShopListPage {

  items: Array<ShopItem> = [];

  constructor(private _loading: LoadingService) {
  }

  isAllDone() {
    return this.items.every((element, index, array) => {return element.done});
  }

  generateList() {
    this._loading.present({content: 'Generando tu lista de la compra...', duration: 2000});
    this.items = [
      {name: 'Producto 1', quantity: 1, done: false},
      {name: 'Producto 2', quantity: 2, done: false},
      {name: 'Producto 3', quantity: 3, done: false},
      {name: 'Producto 4', quantity: 4, done: false},
      {name: 'Producto 5', quantity: 5, done: false}    
    ];
  }

  finished() {
    this._loading.present({content: 'Añadiendo los productos en la despensa...', duration: 2000});
    this.items = [];
  }
}
