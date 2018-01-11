import { Action } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { ErrorDto } from '../../../../shared/model/ErrorDto';

export const LOAD_TEAMS = '[TEAMS] - load teams';
export const LOAD_TEAM = '[TEAM] - load team';
export const REMOVE_TEAM = '[TEAMS] - remove team';
export const CREATE_TEAM = '[TEAMS] - create team';
export const UPDATE_TEAM = '[TEAMS] - update team';
export const REGISTER_EXISTS_TEAM = '[TEAMS] - register exists team';
export const REGISTRATION_FORM_SUCCESS_TEAM = '[TEAMS] - registration form success';
export const SET_PENDING = '[TEAMS] - set pending';

export type TeamsActions =
  LoadTeamsAction | RemoveTeamAction | CreateTeamAction | UpdateTeamAction | RegistrateTeamExistsAction |
  RegistrationFormSuccessAction | LoadTeamAction | PendingActions;

export class LoadTeamsAction implements Action {
  readonly type = LOAD_TEAMS;
  constructor(public payload: TeamDto[]) {}
}

export class RemoveTeamAction implements Action {
  readonly type = REMOVE_TEAM;
  constructor(public payload: TeamDto) {}
}

export class CreateTeamAction implements Action {
  readonly type = CREATE_TEAM;
  constructor(public payload: TeamDto) {}
}

export class UpdateTeamAction implements Action {
  readonly type = UPDATE_TEAM;
  constructor(public payload: TeamDto) {}
}

export class RegistrateTeamExistsAction implements Action {
  readonly type = REGISTER_EXISTS_TEAM;
  constructor(public payload: ErrorDto) {}
}

export class RegistrationFormSuccessAction implements Action {
  readonly type = REGISTRATION_FORM_SUCCESS_TEAM;
  constructor(public payload: boolean) {}
}

export class LoadTeamAction implements Action {
  readonly type = LOAD_TEAM;
  constructor(public payload: TeamDto) {}
}

export class PendingActions implements Action {
  readonly type = SET_PENDING;
  constructor(public payload: boolean) {}
}
