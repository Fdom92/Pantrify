import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-single-item',
  templateUrl: './shop-single-item.component.html',
  styleUrls: ['./shop-single-item.component.scss'],
})
export class ShopSingleItemComponent {
  @Input() item: any;

  constructor() {}


  onAdd(item) {
    if (item.units < 999) {
      item.units += 1;
    }
  }

  onRemove(item) {
    if (item.units > 0) {
      item.units -= 1;
    }
  }
}
