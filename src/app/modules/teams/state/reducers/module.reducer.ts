import { ActionReducerMap } from '@ngrx/store';
import * as TeamsReducer from './team.reducer';
import * as FoodsReducer from './foods.reducer';
import * as TShirtsReducer from './tshirts.reducer';
import * as AccommodationsReducer from './accommodations.reducer';
import { accommodationsReducer } from './accommodations.reducer';
import { foodsReducer } from './foods.reducer';
import { tshirtsReducer } from './tshirts.reducer';
import { teamsReducer } from './team.reducer';
import { AppState } from '../../../../state/app.state';
import { TeamsEffects } from '../effects/teams.effects';

export interface TeamsState {
  accommodations: AccommodationsReducer.State;
  foods: FoodsReducer.State;
  tshirts: TShirtsReducer.State;
  teams: TeamsReducer.State;
}

export interface State extends AppState {
  teams: TeamsState;
}

export const effects = [TeamsEffects];

export const reducers: ActionReducerMap<TeamsState> = {
  accommodations: accommodationsReducer,
  foods: foodsReducer,
  tshirts: tshirtsReducer,
  teams: teamsReducer
};
