import {Component} from "@angular/core";
import {TranslateService} from 'ng2-translate';

@Component({
    templateUrl: "settings.html"
})
export class Settings {

    constructor(public translate: TranslateService) {

    }

    onChange(e) {
        this.translate.use(e);
    }
}
