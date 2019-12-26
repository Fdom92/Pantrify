import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
