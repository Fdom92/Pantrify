import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import { HomeItems, DrinkItems, FoodItems} from '../../providers/data';
import { Item } from '../../classes/items';

@Component({
    templateUrl: "inventory.html"
})
export class Inventory {

    food: Array<Item>;
    home: Array<Item>;
    drink: Array<Item>;
    simpleColumns: any;

    constructor(public navCtrl: NavController) {
      this.food = FoodItems;
      this.home = HomeItems;
      this.drink = DrinkItems;
      this.simpleColumns = [{
         name: 'col1',
         options: [
           { text: '0', value: '0' },
           { text: '1', value: '1' },
           { text: '2', value: '2' },
           { text: '3', value: '3' },
           { text: '4', value: '4' },
           { text: '5', value: '5' },
           { text: '6', value: '6' },
           { text: '7', value: '7' },
           { text: '8', value: '8' },
           { text: '9', value: '9' },
           { text: '10', value: '10' }]
     }];
    }

}
