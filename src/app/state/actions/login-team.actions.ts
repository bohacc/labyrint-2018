import { Action } from '@ngrx/store';
import { LoginTeamDto } from '../../shared/model/LoginTeamDto';

export const LOGIN_TEAM = '[LOGIN_TEAM] - login/logout team';

export type LoginTeamActions = LoginTeamAction;

export class LoginTeamAction implements Action {
  readonly type = LOGIN_TEAM;
  constructor(public payload: LoginTeamDto) {}
}
