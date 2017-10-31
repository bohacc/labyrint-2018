import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public mainForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.mainForm = this.fb.group({
      name: ['', Validators.required ]
    });
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
}
