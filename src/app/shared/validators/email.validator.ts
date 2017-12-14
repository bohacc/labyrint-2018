import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
  const REGEXP = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if (!REGEXP.test(control.value)) {
    return { validEmail: true };
  }
  return null;
}
