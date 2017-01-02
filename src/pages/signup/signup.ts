import {Component} from "@angular/core";
import { NavController, MenuController } from 'ionic-angular';

import { Menu } from '../menu/menu';

@Component({
    templateUrl: "signup.html"
})
export class Signup {

    constructor(public navCtrl: NavController, public menu: MenuController) {
    }

    registerUser() {
        this.navCtrl.setRoot(Menu);
    }

    openTermsOfService(){
        console.log('Terms of service');
    }

    ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    }

    ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
    }
}
