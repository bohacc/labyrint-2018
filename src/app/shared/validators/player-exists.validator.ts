import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidatePlayerExists(group: FormGroup) {
  if (group.invalid) {
    return { validPlayerExists: true };
  }
  return null;
}
