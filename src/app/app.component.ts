import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

declare var grecaptcha: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public mainForm: FormGroup;
  private lang: string;
  public coursesObservable: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private element: ElementRef,
    private db: AngularFireDatabase
  ) {
    this.mainForm = this.fb.group({
      name: ['', Validators.required ],
      captcha: ['']
    });
  }

  ngOnInit() {
    this.coursesObservable = this.getCourses('/courses');
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
  }

  public captcha() {
    grecaptcha.execute();
  }
}
