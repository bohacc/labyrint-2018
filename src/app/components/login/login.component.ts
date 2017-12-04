import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
