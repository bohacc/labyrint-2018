import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaDirective, RECAPTCHA_URL } from './shared/components/recaptcha/recaptcha.directive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ReCaptchaDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: RECAPTCHA_URL,
    useValue: 'http://localhost:8080/validate_captcha'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
