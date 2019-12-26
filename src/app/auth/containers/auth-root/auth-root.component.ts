import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-root',
  templateUrl: './auth-root.component.html',
  styleUrls: ['./auth-root.component.scss'],
})
export class AuthRootComponent {

  constructor(private router: Router) {}

  openSignUpPage() {
    this.router.navigate(['/signup']);
  }

  openLoginPage() {
    this.router.navigate(['/login']);
  }
}
