import { Component, Input } from '@angular/core';

@Component({
  selector: 'shoplist-item',
  templateUrl: 'shoplist-item.html'
})
export class ShopListItemComponent {

  @Input('item') item;

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
