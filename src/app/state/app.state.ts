import { TeamDto } from '../modules/teams/models/TeamDto';
import { State } from '@ngrx/store';

export const initialState: AppState = {
  teams: []
};

export interface AppState {
  readonly teams: TeamDto[];
}
