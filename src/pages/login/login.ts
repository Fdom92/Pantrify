import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';

import { Menu } from '../menu/menu';

@Component({
    templateUrl: "login.html"
})
export class Login {

    email: string;
    password: string;

    constructor(public navCtrl: NavController) {
    }

    onLogin() {
      this.navCtrl.setRoot(Menu);
    }
}
