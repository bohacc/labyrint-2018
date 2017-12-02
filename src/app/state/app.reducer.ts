import { ActionReducerMap } from '@ngrx/store';
import { teamsReducer } from '../modules/teams/state/reducers/team.reducer';
import { captchaReducer } from '../modules/captcha/state/reducers/captcha.reducer';
import { TeamDto } from '../modules/teams/models/TeamDto';

export interface AppState {
  teams: {
    list: TeamDto[],
    registration: {
      name: string
    }
  };
  captcha: {
    status: boolean
  };
}

export const reducers: ActionReducerMap<AppState> = {
  teams: teamsReducer,
  captcha: captchaReducer
};
