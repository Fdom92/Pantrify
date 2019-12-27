import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { PopupService } from '../../../shared/services/popup.service';
import { ShopSingleItemModalComponent } from '../../components/shop-single-item-modal/shop-single-item-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-shop-root',
  templateUrl: './shop-root.component.html',
  styleUrls: ['./shop-root.component.scss'],
})
export class ShopRootComponent implements OnDestroy, OnInit {
  foodItems$ = [];
  drinksItems$ = [];
  homeItems$ = [];

  items: Array<any> = [];
  subscription: Subscription;
  authSubscription: Subscription;

  userData;

  constructor(private popupSvc: PopupService, private authFacade: AuthService,
    private translateSvc: TranslateService) { }

  ngOnInit() {
    this.userData = this.authFacade.getUser();
  }

  isAllDone() {
    return this.items.every((element) => {
      if (element.minimum === 0 && element.units > 0) {
        return true;
      } else if (element.minimum > 0 && element.units >= element.minimum) {
        return true;
      } else {
        return false;
      }
    });
  }

  addSingleItem() {
    this.popupSvc.openModal({ component: ShopSingleItemModalComponent }).then(modalResult => {
      if (modalResult.data.type === 'add') {
        this.items.push({
          title: modalResult.data.item.title, units: parseInt(modalResult.data.item.units, 10),
          type: modalResult.data.item.category, minimum: parseInt(modalResult.data.item.minimum, 10)
        });
      }
    });
  }

  generateList() {
    this.subscription = combineLatest(this.foodItems$, this.drinksItems$, this.homeItems$)
      .subscribe(([food, drinks, home]) => {
        const foodItems = _.cloneDeep(food);
        foodItems.forEach(e => e.type = 'food');
        const drinksItems = _.cloneDeep(drinks);
        drinksItems.forEach(e => e.type = 'drinks');
        const homeItems = _.cloneDeep(home);
        homeItems.forEach(e => e.type = 'home');
        this.items = this.items.concat(foodItems);
        this.items = this.items.concat(drinksItems);
        this.items = this.items.concat(homeItems);
        // TODO Add folder items to the list
      });
  }

  finished() {
    // this.items.forEach((item) => {
    //   if (!item.key) {
    //     this.pantryFacade.pushItem(this.userData.uid, item.type,
    //       { title: item.title, units: parseInt(item.units, 10), minimum: parseInt(item.minimum, 10) });
    //   } else {
    //     if (item.folder) {
    //       this.pantryFacade.updateItemFromFolder(this.userData.uid, item.type, item.folder, item,
    //         { title: item.title, units: parseInt(item.units, 10), minimum: item.minimum });
    //     } else {
    //       this.pantryFacade.updateItem(this.userData.uid, item.type, item,
    //         { title: item.title, units: parseInt(item.units, 10), minimum: item.minimum });
    //     }
    //   }
    // });
    // this.items = [];
    // this.subscription.unsubscribe();
    // this.translateSvc.get('ShopList').subscribe(translation => {
    //   this.popupSvc.openAlert(translation.finish_alert.title, translation.finish_alert.message);
    // });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
