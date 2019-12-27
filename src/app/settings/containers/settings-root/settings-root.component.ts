import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-settings-root',
  templateUrl: './settings-root.component.html',
  styleUrls: ['./settings-root.component.scss'],
})
export class SettingsRootComponent implements OnInit {

  language: string;
  usermail: string;

  constructor(public translate: TranslateService, private authService: AuthService) {
    this.language = translate.currentLang;
  }

  ngOnInit() {
    this.usermail = this.authService.getUser().email;
  }

  onChange(event) {
    this.translate.use(event.detail.value);
  }

  logout() {
    this.authService.logout();
  }
}
