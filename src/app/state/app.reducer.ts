import { ActionReducerMap } from '@ngrx/store';
import { teamsReducer } from '../modules/teams/state/reducers/team.reducer';
import { captchaReducer } from '../modules/captcha/state/reducers/captcha.reducer';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  teams: teamsReducer,
  captcha: captchaReducer
};
