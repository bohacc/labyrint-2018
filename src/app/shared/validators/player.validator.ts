import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidatePlayer(group: FormGroup) {
  console.log(group);
  if (group.invalid) {
    return { validPlayer: true };
  }
  return null;
}
