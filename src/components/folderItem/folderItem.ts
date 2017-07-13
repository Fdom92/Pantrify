import { Component, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'folder-item',
  templateUrl: 'folderItem.html'
})
export class FolderItemComponent implements OnInit{
 
    @Input('products') products;
 
    items: Array<any> = [];

    constructor() {
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
 
}