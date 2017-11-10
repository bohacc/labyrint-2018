import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './registration.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ReCaptchaModule } from '../captcha/ReCaptcha.module';

@NgModule({
    declarations: [
        RegistrationFormComponent
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        ReCaptchaModule,
    ],
    exports: [],
    providers: []
})
export class RegistrationModule {

}
