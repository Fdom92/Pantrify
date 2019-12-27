import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { PantryService } from '../../../shared/services/pantry.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAction } from '@angular/fire/database';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {

  user: User;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private pantrySvc: PantryService, private authSvc: AuthService) {
  }

  ngOnInit() {
    this.user = this.authSvc.getUser();
    this.items$ = this.pantrySvc.getFoodItems(this.user.uid);
  }
}
