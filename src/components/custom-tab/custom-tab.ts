import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { FirebaseService } from '../../providers/firebase.provider';

import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'custom-tab',
  templateUrl: 'custom-tab.html'
})
export class CustomTabPage {

  items: FirebaseListObservable<any[]>;
  type: any;

  constructor(private navParams: NavParams, private _fbService: FirebaseService) {

    this.items = this.navParams.data;
    this.type = this.items.$ref;
  }
}
