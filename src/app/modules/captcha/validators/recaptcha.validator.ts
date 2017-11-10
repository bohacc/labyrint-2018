import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../shared/store/store.service';
import { AbstractControl } from '@angular/forms';

export const RECAPTCHA_URL = new InjectionToken('RECAPTCHA_URL');

@Injectable()
export class ReCaptchaAsyncValidator {

  constructor(
    private http: HttpClient, @Inject(RECAPTCHA_URL) private url,
    private storeService: StoreService
  ) {
  }

  public validateToken( token: string ) {
    return ( _: AbstractControl ) => {
      return this.http.get(this.url, { params: { token } })
        .map(
          (res: any) => {
            console.log('HTTP CALL');
            this.storeService.setRegistrationFromSuccess(!!res.success);
            if ( !res.success ) {
              return { tokenInvalid: true };
            }
            return null;
          }
        );
    };
  }
}
