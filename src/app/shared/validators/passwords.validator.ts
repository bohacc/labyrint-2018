import {AbstractControl} from '@angular/forms';
export function ValidatePasswords (control: AbstractControl) {
  const password = control.get('password').value; // to get value in input tag
  const confirmPassword = control.get('password2').value; // to get value in input tag
  if (password !== confirmPassword) {
    console.log('false');
    return {validPasswords: true};
    // control.get('password2').setErrors( {validPasswords: true} );
  } else {
    console.log('true');
    return null;
  }
}
