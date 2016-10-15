import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';

import { pantryList } from '../pantryList/pantryList';

@Component({
    templateUrl: "login.html"
})
export class Login {

    email: string;
    password: string;

    constructor(public navCtrl: NavController) {
    }

    onLogin() {
      this.navCtrl.setRoot(pantryList);
    }
}
