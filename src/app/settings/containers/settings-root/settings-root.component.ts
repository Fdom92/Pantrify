import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-settings-root',
  templateUrl: './settings-root.component.html',
  styleUrls: ['./settings-root.component.scss'],
})
export class SettingsRootComponent implements OnInit {

  language: string;
  usermail: string;

  constructor(public translate: TranslateService, private authFacade: AuthService) {
    this.language = translate.currentLang;
  }

  ngOnInit() {
    this.usermail = this.authFacade.getUser().email;
  }

  onChange(event) {
    this.translate.use(event.detail.value);
  }

  logout() {
    this.authFacade.logout();
  }
}
