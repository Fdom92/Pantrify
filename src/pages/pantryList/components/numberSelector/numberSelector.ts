import {Component, Input} from "@angular/core";

@Component({
    templateUrl: "numberSelector.html",
    selector: "ion-number-selector"
})
export class numberSelector {
    @Input() private max: number;

    counter: number;

    constructor() {
      this.counter = 1;
    }

    onAdd() {
      if (this.counter < this.max) {
          this.counter++;
      }
    }

    onMinus() {
      if (this.counter > 0) {
          this.counter--;
      }
    }
}
