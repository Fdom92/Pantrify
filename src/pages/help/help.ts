import {Component} from "@angular/core";
import {TranslateService} from 'ng2-translate';

@Component({
    templateUrl: "help.html"
})
export class Help {

    constructor(public translate: TranslateService) {
    }

}
