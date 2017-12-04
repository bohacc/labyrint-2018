import { Action } from '@ngrx/store';
import { UserDto } from '../../models/UserDto';

export const AUTH_USER = '[AUTH_USER] - auth user';

export type UserActions = AuthUserAction;

export class AuthUserAction implements Action {
  readonly type = AUTH_USER;
  constructor(public payload: any) {} // TODO: add type
}
