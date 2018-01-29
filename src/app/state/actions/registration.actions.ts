import { Action } from '@ngrx/store';

export const SET_END_REGISTRATION = '[SET_END_REGISTRATION] - disable registration';

export type RegistrationActions = SetDisableRegistrationAction;

export class SetDisableRegistrationAction implements Action {
  readonly type = SET_END_REGISTRATION;
  constructor(public payload: boolean) {}
}
