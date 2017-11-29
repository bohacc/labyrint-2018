import { Action } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { Injectable } from '@angular/core';

export const LOAD_TEAMS = '[TEAMS] - load teams';
export const REMOVE_TEAM = '[TEAMS] - remove team';
export const CREATE_TEAM = '[TEAMS] - create team';

export type TeamsActions = LoadTeamsAction | RemoveTeamAction | CreateTeamAction;

export class LoadTeamsAction implements Action {
  type = LOAD_TEAMS;
  constructor(public payload: TeamDto[]) {console.log('LoadTeamsAction'); }
}

export class RemoveTeamAction implements Action {
  type = REMOVE_TEAM;
  constructor(public payload: TeamDto) {}
}

export class CreateTeamAction implements Action {
  type = CREATE_TEAM;
  constructor(public payload: TeamDto) {}
}
