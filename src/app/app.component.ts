import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReCaptchaDirective } from './modules/captcha/directives/recaptcha.directive';
import { StoreService } from './modules/shared/store/store.service';

declare const grecaptcha: any;

declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('recaptcha') recaptcha;
  title = 'app';
  public mainForm: FormGroup;
  private lang: string;
  public coursesObservable: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private element: ElementRef,
    private db: AngularFireDatabase,
    private storeService: StoreService
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

  ngOnInit() {
    this.coursesObservable = this.getCourses('/courses');
  }

  ngAfterViewInit() {
    // grecaptcha.execute();
  }

  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  public addTeam() {
    this.http.post('/team', {})
    .subscribe(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  }

  public sendForm() {
    console.log('XXX');
    this.recaptcha.execute();
  }

  public sendValidateForm() {
    console.log(this.mainForm.invalid);
    console.log('STEP');
  }
}
