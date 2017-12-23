import { ActionReducerMap } from '@ngrx/store';
import { teamsReducer } from '../modules/teams/state/reducers/team.reducer';
import { captchaReducer } from '../modules/captcha/state/reducers/captcha.reducer';
import { AppState } from './app.state';
import { userAuthReducer } from '../modules/teams/state/reducers/userAuth.reducer';
import { tshirtsReducer } from '../modules/teams/state/reducers/tshirts.reducer';
import { foodsReducer } from '../modules/teams/state/reducers/foods.reducer';
import { accommodationsReducer } from '../modules/teams/state/reducers/accommodations.reducer';
import { configReducer } from '../modules/teams/state/reducers/config.reducer';

export const reducers: ActionReducerMap<AppState> = {
  config: configReducer,
  accommodations: accommodationsReducer,
  foods: foodsReducer,
  tshirts: tshirtsReducer,
  teams: teamsReducer,
  captcha: captchaReducer,
  userAuth: userAuthReducer
};
