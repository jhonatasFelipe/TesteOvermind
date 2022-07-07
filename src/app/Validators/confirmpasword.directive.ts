import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const confirmPaswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repassword = control.get('repassword');

  return password?.value !== repassword?.value ? { confirmPasword: true } : null;
};

@Directive({
  selector: '[appConfirmpasword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmpaswordDirective, multi: true}]
})
export class ConfirmpaswordDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return confirmPaswordValidator(control);
  }

}
