import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidatePlayerExists(group: FormGroup) {
  console.log(group);
  if (group.invalid) {
    return { validPlayerExists: true };
  }
  return null;
}
