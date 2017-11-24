import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReCaptchaDirective } from '../../../../modules/captcha/directives/recaptcha.directive';
import { StoreService } from '../../../shared/store/store.service';
import { TeamsService } from '../../../teams/components/teams.service';

@Component({
    selector: 'registration-form',
    templateUrl: 'registration-form.component.html'
})
export class RegistrationFormComponent {
    @ViewChild('recaptcha') recaptcha;
    title = 'app';
    public mainForm: FormGroup;
    private lang: string;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private element: ElementRef,
        private db: AngularFireDatabase,
        private storeService: StoreService,
        private teamsService: TeamsService
    ) {
        this.mainForm = this.fb.group({
            name: ['', Validators.required ],
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
        this.recaptcha.execute();
    }

    public sendValidateForm() {
        console.log(this.mainForm.invalid);
        console.log('STEP');
        this.teamsService.createTeam(this.mainForm.value);
    }
}
