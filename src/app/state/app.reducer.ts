import { ActionReducerMap } from '@ngrx/store';
import { teamsReducer } from '../modules/teams/state/reducers/team.reducer';
import { captchaReducer } from '../modules/captcha/state/reducers/captcha.reducer';
import { AppState } from './app.state';
import { userAuthReducer } from '../modules/teams/state/reducers/userAuth.reducer';
import { tshirtsReducer } from '../modules/teams/state/reducers/tshirts.reducer';
import { foodReducer } from '../modules/teams/state/reducers/food.reducer';

export const reducers: ActionReducerMap<AppState> = {
  food: foodReducer,
  tshirts: tshirtsReducer,
  teams: teamsReducer,
  captcha: captchaReducer,
  userAuth: userAuthReducer
};
