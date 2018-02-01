import { AbstractControl } from '@angular/forms';

export function ValidateTeamName(control: AbstractControl) {
  const blackList = ['.', '#', '$', '[', ']'];
  let exist = false;
  blackList.forEach((item) => {
    if (control.value.indexOf(item) > -1) {
      exist = true;
    }
  });
  if (exist) {
    return { validTeamName: true };
  }
  return null;
}
