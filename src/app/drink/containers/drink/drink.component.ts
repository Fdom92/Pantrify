import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { PantryService } from '../../../shared/pantry.service';
import { AuthService } from '../../../shared/auth.service';
import { AngularFireAction } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
})
export class DrinkComponent implements OnInit {

  user: User;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private pantrySvc: PantryService, private authSvc: AuthService) {
  }

  ngOnInit() {
    this.user = this.authSvc.getUser();
    this.items$ = this.pantrySvc.getDrinkItems(this.user.uid);
  }
}
