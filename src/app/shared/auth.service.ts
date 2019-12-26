import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';

@Injectable()
export class AuthService {

  public user: firebase.User;
  public authState$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.user = null;
    this.authState$ = afAuth.authState;

    this.authState$.subscribe((user: firebase.User) => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  public getToken(): Observable<string> {
    return from(this.user.getIdToken());
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password));
  }

  signup(email: string, password: string): Observable<any> {
    return from(this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password));
  }

  getUser() {
    return this.user;
  }

  logout(): Observable<any> {
    return from(this.afAuth
      .auth
      .signOut());
  }
}
