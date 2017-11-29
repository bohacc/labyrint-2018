import { Action } from '@ngrx/store';

export const INIT_CAPTCHA = '[CAPTCHA] - init captcha';

export type CaptchaActions = InitCaptchaAction;

export class InitCaptchaAction implements Action {
  type = INIT_CAPTCHA;
}
