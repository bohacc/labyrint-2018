import { TeamDto } from '../modules/teams/models/TeamDto';
import { State } from '@ngrx/store';

export const initialState: AppState = {
  teams: [],
  registration: {
    name: null
  },
  captcha: false
};

export interface AppState {
  teams: TeamDto[];
  registration: {
    name: string
  };
  captcha: boolean;
}
