import { NgModule } from '@angular/core';
import { StoreService } from '../../shared/store/store.service';
import { ReCaptchaAsyncValidator } from './validators/recaptcha.validator';
import { ReCaptchaDirective } from '../captcha/directives/recaptcha.directive';
import { RECAPTCHA_URL } from './validators/recaptcha.validator';

@NgModule({
    declarations: [
        ReCaptchaDirective
    ],
    imports: [],
    exports: [
        ReCaptchaDirective
    ],
    providers: [
        ReCaptchaAsyncValidator,
        StoreService,
        {
            provide: RECAPTCHA_URL,
            useValue: '/checkRecaptcha'
        }
    ]
})
export class ReCaptchaModule {

}
