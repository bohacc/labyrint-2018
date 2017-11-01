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
      name: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.registerReCaptchaCallback();
    this.addScript();
  }

  registerReCaptchaCallback() {
    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': this.key,
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(this.element.nativeElement, config);
    };
  }

  private render( element: HTMLElement, config ): number {
    return grecaptcha.render(element, config);
  }

  private addScript() {
    let script = document.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
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
