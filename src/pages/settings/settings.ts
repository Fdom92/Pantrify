import {Component} from "@angular/core";
import {TranslateService} from 'ng2-translate';

@Component({
    templateUrl: "settings.html"
})
export class Settings {

    constructor(public translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    onChange(e) {
        this.translate.use(e);
    }
}
