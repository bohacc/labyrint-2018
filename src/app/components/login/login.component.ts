import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ValidateEmail } from '../../shared/validators/email.validator';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public email: FormControl;
  public password: FormControl;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public login() {
    const credentials = this.loginForm.value;
    this.authService.emailLogin(credentials.email, credentials.password);
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, ValidateEmail]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }
}
