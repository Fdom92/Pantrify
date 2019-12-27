import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(private router: Router, private authSvc: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.authSvc.signup(this.registerForm.get('email').value, this.registerForm.get('password').value)
        .subscribe(response => {
          if (response.user) {
            this.router.navigate(['/main/tabs/food']);
          }
        });
    }
  }
}
