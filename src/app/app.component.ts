import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  hideMenu = true;
  usermail: string;

  pages: Array<{ title: string, icon: string }>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authSvc: AuthService) {

    this.authSvc.authState$.subscribe(user => {
      if (user) {
        this.hideMenu = false;
        this.usermail = user.email;
      } else {
        this.hideMenu = true;
        this.usermail = null;
      }
    });
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  homePage() {
    this.router.navigate(['/main/tabs/food']);
  }

  cartPage() {
    this.router.navigate(['/shop']);
  }

  settingsPage() {
    this.router.navigate(['/settings']);
  }
}
