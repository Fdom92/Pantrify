import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    templateUrl: "inventory.html"
})
export class Inventory {

    food: FirebaseListObservable<any[]>;
    home:FirebaseListObservable<any[]>;
    drink: FirebaseListObservable<any[]>;
    simpleColumns: any;

    constructor(public navCtrl: NavController, af: AngularFire) {
      this.food = af.database.list('/food');
      this.home = af.database.list('/home');
      this.drink = af.database.list('/drinks');
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
