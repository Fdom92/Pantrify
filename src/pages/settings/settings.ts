import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AlertController } from 'ionic-angular';

@Component({
    templateUrl: "settings.html"
})
export class Settings {
    language: string;

    constructor(public translate: TranslateService, private alertCtrl: AlertController) {
        this.language = translate.currentLang;
    }

    onChange(e) {
        this.translate.use(e);
    }


    presentAlert() {
    let alert = this.alertCtrl.create({
        title: 'Thank you',
        subTitle: 'Contact us at fer.olmo92@gmail.com ',
        buttons: ['Dismiss']
    });
    alert.present();
    }
}
