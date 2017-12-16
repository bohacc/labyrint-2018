import * as TShirtsReducer from '../modules/teams/state/reducers/tshirts.reducer';
import * as TeamsReducer from '../modules/teams/state/reducers/team.reducer';
import * as UserAuthReducer from '../modules/teams/state/reducers/userAuth.reducer';
import * as CaptchaReducer from '../modules/captcha/state/reducers/captcha.reducer';
import * as FoodReducer from '../modules/teams/state/reducers/food.reducer';

export interface AppState {
  food: FoodReducer.State;
  tshirts: TShirtsReducer.State;
  teams: TeamsReducer.State;
  captcha: CaptchaReducer.State;
  userAuth: UserAuthReducer.State;
}
