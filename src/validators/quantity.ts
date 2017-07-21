import { FormControl } from '@angular/forms';

export class QuantityValidator {

  static isValid(control: FormControl): any {

    if (control.value < 1) {
      return { invalid_quantity: true };
    }

    if (control.value > 999) {
      return { invalid_quantity: true };
    }

    return null;
  }

}
