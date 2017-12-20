import { AbstractControl } from '@angular/forms';

export function ValidatePhone(control: AbstractControl) {
  const REGEXP = /^\+[1-9]{1}[0-9]{3,14}$/;
  if (!REGEXP.test(control.value)) {
    return { validPhone: true };
  }
  return null;
}
