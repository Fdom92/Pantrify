import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';

import { pantryList } from '../pantryList/pantryList';
import { Login } from '../login/login';

@Component({
    templateUrl: "signup.html"
})
export class Signup {

    constructor(public navCtrl: NavController) {
    }

    openLoginPage() {
      this.navCtrl.setRoot(Login);
    }

    registerUser() {
      this.navCtrl.setRoot(pantryList);
    }
}
