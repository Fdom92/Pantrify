import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { PopoverController } from 'ionic-angular';
import { SettingsPopOver } from './popover/settings.popover';

@Component({
    templateUrl: "settings.html"
})
export class Settings {
    language: string;

    constructor(public translate: TranslateService, public popoverCtrl: PopoverController) {
        this.language = translate.currentLang;
    }

    onChange(e) {
        this.translate.use(e);
    }

    presentPopover(ev) {
      let popover = this.popoverCtrl.create(SettingsPopOver, {});

      popover.present({
        ev: ev
      });
    }
}
