import { AbstractControl } from '@angular/forms';

export function ValidatePhone(control: AbstractControl) {
  const REGEXP = /^(\+?420)? ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}$/;
  if (!REGEXP.test(control.value)) {
    return { validPhone: true };
  }
  return null;
}
