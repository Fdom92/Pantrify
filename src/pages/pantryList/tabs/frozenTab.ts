import { Component } from '@angular/core';

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Frozen</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>
  <ion-list>
    <ion-item *ngFor="let item of items">
      <h2>{{item.title}}</h2>
      <p>Quantity: {{item.units}}</p>
      <ion-icon name="trash" item-right (click)="onDelete()"></ion-icon>
    </ion-item>
  </ion-list>
  <ion-fab right bottom>
     <button ion-fab mini (click)="onAdd()"><ion-icon name="add"></ion-icon></button>
  </ion-fab>
  </ion-content>`
})
export class Frozen {

  items = [{
    'title': 'Onion',
    'units': 1
  },
  {
    'title': 'Meat',
    'units': 2
  },
  {
    'title': 'Fish',
    'units': 1
  },
  {
    'title': 'Meat',
    'units': 2
  },
  {
    'title': 'Fish',
    'units': 1
  },
  {
    'title': 'Meat',
    'units': 2
  },
  {
    'title': 'Fish',
    'units': 1
  },
  {
    'title': 'Meat',
    'units': 2
  },
  {
    'title': 'Fish',
    'units': 1
  }];

  constructor() {
    console.log('Frozen');
  }

  onDelete() {
    console.log('deleted');
  }

  onAdd() {
    console.log('added');
  }
}
