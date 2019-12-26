import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { PantryService } from '../../../shared/pantry.service';
import { AuthService } from '../../../shared/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAction } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user: User;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;


  constructor(private pantrySvc: PantryService, private authSvc: AuthService) {
  }

  ngOnInit() {
    this.user = this.authSvc.getUser();
    this.items$ = this.pantrySvc.getHomeItems(this.user.uid);
  }
}
