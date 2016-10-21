import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';

import { Menu } from '../menu/menu';

@Component({
    templateUrl: "signup.html"
})
export class Signup {

    constructor(public navCtrl: NavController) {
    }

    registerUser() {
        this.navCtrl.setRoot(Menu);
    }

    openTermsOfService(){
        console.log('Terms of service');
    }
}
