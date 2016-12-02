import {Component} from "@angular/core";
import {TranslateService} from 'ng2-translate';

@Component({
    templateUrl: "settings.html"
})
export class Settings {

    language: string;

    constructor(public translate: TranslateService) {
        this.language = translate.currentLang;
    }

    onChange(e) {
        this.translate.use(e);
    }
}
