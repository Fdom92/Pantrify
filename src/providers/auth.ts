import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  googleProvider: any;

  constructor() {
    this.fireAuth = firebase.auth(); // We are creating an auth reference.

    // Google Provider for Google Auth
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

  /**
   * This function doesn't take any params, it just signin the current user
   * using google provider.
   */
  googleSignin(): any {
    return this.fireAuth.signInWithRedirect(this.googleProvider);
  }
}