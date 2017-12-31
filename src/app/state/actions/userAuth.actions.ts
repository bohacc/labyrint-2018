import { Action } from '@ngrx/store';
import { UserAuthDto } from '../../shared/model/UserAuthDto';

export const AUTH_USER = '[AUTH_USER] - auth user';

export type UserAuthActions = UserAuthAction;

export class UserAuthAction implements Action {
  readonly type = AUTH_USER;
  constructor(public payload: UserAuthDto) {}
}
