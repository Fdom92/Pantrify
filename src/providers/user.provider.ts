import { Injectable } from '@angular/core';

@Injectable()
export class UserData {

  private email: String = '';
  private uid: String = '';

  setUserData(userData) {
    this.email = userData.email;
    this.uid = userData.uid;
  }

  getEmail(): String {
    return this.email;
  }

  getUid(): String {
    return this.uid;
  }
}
