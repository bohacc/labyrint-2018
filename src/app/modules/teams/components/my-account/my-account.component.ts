import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { Observable } from 'rxjs/Observable';
import { LoginTeamDto } from '../../../../shared/model/LoginTeamDto';
import { ValidatePasswords } from '../../../../shared/validators/passwords.validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePhone } from '../../../../shared/validators/phone.validator';
import { ValidatePlayer } from '../../../../shared/validators/player.validator';
import { ValidateEmail } from '../../../../shared/validators/email.validator';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  public loginUser$: Observable<LoginTeamDto>;
  public mainForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public passwords: FormGroup;
  public password: FormControl;
  public password2: FormControl;
  public phone: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public firstName2: FormControl;
  public lastName2: FormControl;
  public firstName3: FormControl;
  public lastName3: FormControl;
  public firstName4: FormControl;
  public lastName4: FormControl;
  public firstName5: FormControl;
  public lastName5: FormControl;
  public tshirt: FormControl;
  public tshirt2: FormControl;
  public tshirt3: FormControl;
  public tshirt4: FormControl;
  public tshirt5: FormControl;
  public food: FormControl;
  public food2: FormControl;
  public food3: FormControl;
  public food4: FormControl;
  public food5: FormControl;
  public accommodation: FormControl;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.loginUser$ = this.store.select(state => state.loginTeam.team);
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
    this.email = new FormControl('', [Validators.required, ValidateEmail]);
    this.phone = new FormControl('', [Validators.required, ValidatePhone]);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.firstName2 = new FormControl('');
    this.lastName2 = new FormControl('');
    this.firstName3 = new FormControl('');
    this.lastName3 = new FormControl('');
    this.firstName4 = new FormControl('');
    this.lastName4 = new FormControl('');
    this.firstName5 = new FormControl('');
    this.lastName5 = new FormControl('');
    this.tshirt = new FormControl('');
    this.tshirt2 = new FormControl('');
    this.tshirt3 = new FormControl('');
    this.tshirt4 = new FormControl('');
    this.tshirt5 = new FormControl('');
    this.food = new FormControl('', Validators.required);
    this.food2 = new FormControl('');
    this.food3 = new FormControl('');
    this.food4 = new FormControl('');
    this.food5 = new FormControl('');
    this.accommodation = new FormControl('', Validators.required);

    this.mainForm = this.fb.group({
      data: this.fb.group({
        name: this.name,
        email: this.email,
        phone: this.phone,
        accommodation: this.accommodation,
        player1: this.fb.group(
          {
            firstName: this.firstName,
            lastName: this.lastName,
            tshirt: this.tshirt,
            food: this.food,
          },
          {validator: [ValidatePlayer]}
        ),
        player2: this.fb.group(
          {
            firstName: this.firstName2,
            lastName: this.lastName2,
            tshirt: this.tshirt2,
            food: this.food2,
          },
          {validator: [ValidatePlayer]}
        ),
        player3: this.fb.group(
          {
            firstName: this.firstName3,
            lastName: this.lastName3,
            tshirt: this.tshirt3,
            food: this.food3,
          },
          {validator: [ValidatePlayer]}
        ),
        player4: this.fb.group(
          {
            firstName: this.firstName4,
            lastName: this.lastName4,
            tshirt: this.tshirt4,
            food: this.food4,
          },
          {validator: [ValidatePlayer]}
        ),
        player5: this.fb.group(
          {
            firstName: this.firstName5,
            lastName: this.lastName5,
            tshirt: this.tshirt5,
            food: this.food5,
          },
          {validator: [ValidatePlayer]}
        ),
        payId: ''
      }),
      captcha: ['']
    });
  }

  public saveTeam() {}
}
