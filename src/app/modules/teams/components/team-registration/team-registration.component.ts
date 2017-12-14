import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReCaptchaDirective } from '../../../captcha/directives/recaptcha.directive';
import { StoreService } from '../../../../shared/store/store.service';
import { TeamsService } from '../../teams.service';
import { ValidateEmail } from '../../../../shared/validators/email.validator';

@Component({
  selector: 'registration-form',
  templateUrl: 'team-registration.component.html',
  styleUrls: ['team-registration.component.scss']
})
export class TeamRegistrationComponent {
  @ViewChild('recaptcha') recaptcha;
  public title = 'app';
  public mainForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  private lang: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private element: ElementRef,
    private db: AngularFireDatabase,
    private storeService: StoreService,
    private teamsService: TeamsService
  ) {
    // TODO: create email, password format validators
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
    this.email = new FormControl('', [Validators.required, ValidateEmail]);
    this.password = new FormControl('', Validators.required);
    this.mainForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      captcha: ['']
    });

    // captcha success
    this.storeService.getRegistrationFormSuccess()
      .subscribe((result: boolean) => {
        if (result) {
          this.sendValidateForm();
        }
      });
  }

  public sendForm() {
    console.log('XXX');
    if (!this.mainForm.get('captcha').valid) {
      // TODO: localization captcha
      console.log('CAPTCHA VALIDATION');
      this.recaptcha.execute();
    } else {
      this.sendValidateForm();
    }
  }

  public sendValidateForm() {
    console.log(this.mainForm.invalid);
    console.log('STEP');
    const team = this.mainForm.value;
    delete team.captcha;
    this.teamsService.addItem(team);
  }
}
