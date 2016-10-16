import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';

import { pantryList } from '../pantryList/pantryList';

@Component({
    templateUrl: "signup.html"
})
export class Signup {

    constructor(public navCtrl: NavController) {
    }

    registerUser() {
      this.navCtrl.setRoot(pantryList);
    }
}
