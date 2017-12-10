import { Action } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';

export const LOAD_TEAMS = '[TEAMS] - load teams';
export const REMOVE_TEAM = '[TEAMS] - remove team';
export const CREATE_TEAM = '[TEAMS] - create team';
export const UPDATE_TEAM = '[TEAMS] - update team';

export type TeamsActions = LoadTeamsAction | RemoveTeamAction | CreateTeamAction | UpdateTeamAction;

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
