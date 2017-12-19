import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidatePlayer(group: FormGroup) {
  if (!group.get('firstName').value || !group.get('lastName').value || !group.get('food').value) {
    return { validPlayer: true };
  }
  return null;
}
