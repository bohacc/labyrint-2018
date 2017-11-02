import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private element: ElementRef
  ) {
    this.mainForm = this.fb.group({
      name: ['', Validators.required ],
      captcha: ['']
    });
  }

  ngOnInit() {
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
