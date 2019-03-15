import {AbstractControl, ValidatorFn} from '@angular/forms';

export class PanValidators {
  public static ipValidator(): ValidatorFn {
    const ip: RegExp = new RegExp('^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$');
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isIp = ip.test(control.value);
      return !isIp ? {ipValidator: {value: control.value}} : null;
    };
  }
}
