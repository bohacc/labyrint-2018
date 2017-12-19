import { AbstractControl } from '@angular/forms';

export function ValidatePhone(control: AbstractControl) {
  const REGEXP = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm; // TODO: change regex
  if (!REGEXP.test(control.value)) {
    return { validPhone: true };
  }
  return null;
}
